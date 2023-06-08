"use client";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import LocationSelect from "../inputs/LocationSelect";
import AddressCity from "../inputs/AddressCity";
import AddressTown from "../inputs/AddressTown";
import AddressDistrict from "../inputs/AddressDistrict";
import AddressNeighborhood from "../inputs/AddressesNeighborhood";
import AddressDetails from "../inputs/AddressDetails";
import CarMake from "../inputs/CarMake";
import CarModel from "../inputs/CarModel";
import CarCategory from "../inputs/CarCategory";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs from "dayjs";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  ADDRESS = 2,
  CARSPECS = 3,
  INFO = 4,
  IMAGES = 5,
  DESCRIPTION = 6,
  START_AND_END_DATE = 7,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      address: {
        cityName: "",
        townName: "",
        districtName: "",
        neighborhoodName: "",
        details: "",
      },
      car: {
        make: "",
        model: "",
        category: "",
        year: 0,
        isACworking: false,
      },
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      title: "",
      description: "",
      m2: 0,
      startDate: new Date(new Date(Date.now()).toISOString().split("T")[0]),
      endDate: new Date(new Date(Date.now()).toISOString().split("T")[0]),
    },
  });

  const category = watch("category");
  const location = watch("location");
  const m2 = watch("m2");

  const cityName = watch("address.cityName");
  const townName = watch("address.townName");
  const districtName = watch("address.districtName");
  const neighborhoodName = watch("address.neighborhoodName");
  const details = watch("address.details");
  const address = watch("address");

  const car = watch("car");

  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step === STEPS.CATEGORY && !category) {
      toast.error("Kategori seçilmeden ilerlenemez!");
      return;
    }
    if (step === STEPS.LOCATION && !location) {
      toast.error("Konum seçilmeden ilerlenemez!");
      return;
    }
    if (step !== STEPS.START_AND_END_DATE) {
      // last step
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Paylaşım Oluşturuldu!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY); // reset the steps to category - first one
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Üzgünüz. Hata oluştu :(");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.START_AND_END_DATE) {
      // STEPS.last_element
      return "Oluştur";
    }

    return "İleri";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      // STEPS.first_element
      return undefined;
    }

    return "Geri";
  }, [step]);

  console.log("location: " + location);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Kategori seçiniz"
        subtitle="Lütfen oluşturmak istediğiniz barınma seçeneğinin tipini belirtiniz"
      />
      <div
        className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-3
                    max-h-[50vh]
                    overflow-y-auto
                "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading
          title="Konum giriniz"
          subtitle="Lütfen oluşturmak istediğiniz barınma seçeneğinin konumunu belirtiniz"
        />
        <LocationSelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map
          draggable={true}
          center={location}
          onMarkerPositionChange={(value) => setCustomValue("location", value)}
        />
      </div>
    );
  }

  if (step === STEPS.ADDRESS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Adres giriniz"
          subtitle="Lütfen oluşturmak istediğiniz barınma seçeneğinin adresini belirtiniz"
        />
        <AddressCity
          value={cityName}
          onChange={(value) => setCustomValue("address.cityName", value)}
        />

        <AddressTown
          city={cityName}
          value={townName}
          onChange={(value) => setCustomValue("address.townName", value)}
        />

        <AddressDistrict
          city={cityName}
          town={townName}
          value={districtName}
          onChange={(value) => setCustomValue("address.districtName", value)}
        />

        <AddressNeighborhood
          city={cityName}
          town={townName}
          district={districtName}
          value={neighborhoodName}
          onChange={(value) =>
            setCustomValue("address.neighborhoodName", value)
          }
        />

        <AddressDetails
          value={details}
          onChange={(value) => setCustomValue("address.details", value)}
        />

        <TextField
          className="px-8"
          label="Metrekare"
          variant="outlined"
          type="number"
          value={m2}
          onChange={(event) => {
            Number(event.target.value);
            setCustomValue("m2", Number(event.target.value));
          }}
        />

        <>{JSON.stringify(address)}</>
      </div>
    );
  }

  if (step === STEPS.CARSPECS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Araç Modeli Giriniz"
          subtitle="Lütfen aracın özelliklerini ekleyiniz"
        />
        <CarMake
          make={car.make}
          onChange={(value) => {
            setCustomValue("car.make", value);
          }}
        />
        <CarModel
          make={car.make}
          model={car.model}
          onChange={(value) => {
            setCustomValue("car.model", value);
          }}
        />
        <CarCategory
          value={car.category}
          onChange={(value) => {
            setCustomValue("car.category", value);
          }}
        />
        <div>
          <TextField
            className="px-8"
            label="Araç yapım yılı"
            variant="outlined"
            type="number"
            value={car.year}
            onChange={(event) => {
              Number(event.target.value);
              setCustomValue("car.year", event.target.value);
            }}
          />
          <FormControlLabel
            className="px-8 py-5"
            control={
              <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={car.isACworking}
                onChange={(e) => {
                  setCustomValue("car.isACworking", !car.isACworking);
                }}
              />
            }
            label="Klima çalışıyor mu"
          />
        </div>

        <>{JSON.stringify(car)}</>
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Temel bilgiler giriniz"
          subtitle="Lütfen oluşturmak istediğiniz barınma seçeneğine ait özellikleri belirtiniz"
        />
        <Counter
          title="Misafir"
          subtitle="Toplam kişi kapasitesi"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Oda"
          subtitle="Toplam oda sayısı"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Banyo"
          subtitle="Toplam banyo sayısı"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
        <hr />
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <div className="font-medium">Yaşam Alanı</div>
            <div className="font-light text-gray-600">
              Yaşam alanının metrekare büyüklüğü
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <TextField
              className="px-8"
              variant="outlined"
              type="number"
              value={m2}
              onChange={(event) => {
                Number(event.target.value);
                setCustomValue("m2", event.target.value);
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Fotoğraf yükleyiniz"
          subtitle="Lütfen oluşturmak istediğiniz barınma seçeneğine ait fotoğraf yükleyiniz"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Açıklama giriniz"
          subtitle="Lütfen oluşturmak istediğiniz barınma seçeneğine ait açıklamalar giriniz"
        />
        <Input
          id="title"
          label="Başlık" // TODO:
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Açıklama" // TODO:
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.START_AND_END_DATE) {
    // TODO
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Süre giriniz"
          subtitle="Lütfen oluşturmak istediğiniz barınma seçeneği için başlangıç ve bitiş tarihini seçiniz"
        />
        <div>startDate: {startDate?.toISOString().split("T")[0]}</div>
        <div>endDate: {endDate?.toISOString().split("T")[0]}</div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoItem component="DateRangePicker">
            <DateRangePicker
              defaultValue={[dayjs(startDate), dayjs(endDate)]}
              onChange={(value) => {
                setCustomValue("startDate", value[0]);
                setCustomValue("endDate", value[1]);
              }}
              disablePast={true}
            />
          </DemoItem>
        </LocalizationProvider>
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Open House - Geçici Barınma Paylaş"
      body={bodyContent}
    />
  );
};

export default RentModal;
