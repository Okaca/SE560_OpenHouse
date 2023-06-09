"use client";

import qs from "query-string";
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import Heading from "../Heading";
import Counter from "../inputs/Counter";
import AddressCity from "../inputs/AddressCity";
import AddressTown from "../inputs/AddressTown";

enum STEPS {
  ADDRESS = 0,
  INFO = 1, // kişi sayısı
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [cityName, setCity] = useState("");
  const [townName, setTown] = useState("");
  const [step, setStep] = useState(STEPS.ADDRESS);
  const [guestCount, setGuestCount] = useState(1);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    let updatedQuery: any;
    if (cityName === "") {
      updatedQuery = {
        ...currentQuery,
        guestCount,
      };
    } else if (townName === "") {
      updatedQuery = {
        ...currentQuery,
        cityName,
        guestCount,
      };
    } else {
      updatedQuery = {
        ...currentQuery,
        cityName,
        townName,
        guestCount,
      };
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.ADDRESS);
    searchModal.onClose();

    router.push(url);
  }, [
    step,
    searchModal,
    router,
    cityName,
    townName,
    guestCount,
    onNext,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Ara"; // TODO:
    }

    return "İleri"; // TODO:
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.ADDRESS) {
      return undefined;
    }

    return "Geri"; // TODO:
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Adres" subtitle="İl ve/veya ilçe seçiniz" />
      <hr />
      <AddressCity value={cityName} onChange={(value) => setCity(value)} />

      <AddressTown
        city={cityName}
        value={townName}
        onChange={(value) => setTown(value)}
      />
    </div>
  );

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Diğer Bilgiler"
          subtitle="" // TODO:
        />
        <hr />
        <Counter
          title="Misafirler"
          subtitle="Misafir Sayısı"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filtreler"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.ADDRESS ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default SearchModal;
