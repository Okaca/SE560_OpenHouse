"use client";

import useBookModal from "@/app/hooks/useBookModal";
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
import { OutLinedInput } from "@material-ui/core/OutLinedInput";
// import CitySelect from "../inputs/CitySelect";
// import TownSelect from "../inputs/TownSelect";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
}

const BookModal = () => {
  const router = useRouter();
  const bookModal = useBookModal();

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
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

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
    if (step === STEPS.CATEGORY && !data.category) {
      toast.error("Lütfen bir kategori seçin."); // Display error toast
      return;
    }

    if (step !== STEPS.DESCRIPTION) {
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
        bookModal.onClose();
      })
      .catch(() => {
        toast.error("Üzgünüz. Hata oluştu :(");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.DESCRIPTION) {
      // STEPS.last_element
      return "Oluştur";
    }
    return "İleri";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      // STEPS.first_element
      return "Kapat";
    }
    return "Geri";
  }, [step]);

  const secondaryAction = () => {
    if (step === STEPS.CATEGORY) {
      reset();
      return bookModal.onClose();
    }
    return onBack();
  };

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
      <div className="flex flex-col gap-8">
        <Heading
          title="Konum giriniz"
          subtitle="Lütfen oluşturmak istediğiniz barınma seçeneğinin konumunu belirtiniz"
        />
        {/* <CitySelect
          value={cityLocation}
          onChange={(value) => setCustomValue("cityLocation", value)}
        />
        {cityLocation && (
          <TownSelect
            city={cityLocation?.name}
            value={townLocation}
            onChange={(value) => setCustomValue("townLocation", value)}
          /> */}
          <OutLinedInput/>
        )}
        <Map center={location?.latlng} />
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

  /*if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Süre giriniz"
          subtitle="Lütfen oluşturmak istediğiniz barınma seçeneği için toplam gün sayısı giriniz"
        />
        <Input
          id="price"
          label="Gün Sayısı"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }*/

  return (
    <Modal
      isOpen={bookModal.isOpen}
      onClose={bookModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={secondaryAction}
      title="Open House - Geçici Barınma Paylaş"
      body={bodyContent}
    />
  );
};

export default BookModal;
