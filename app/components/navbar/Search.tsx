"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const cityName = params?.get("cityName");
  const townName = params?.get("townName");
  const guestCount = params?.get("guestCount");

  const cityLabel = useMemo(() => {
    if (cityName) {
      return cityName;
    }
    return "Şehir";
  }, [cityName]);

  const townLabel = useMemo(() => {
    if (townName) {
      return townName;
    }
    return "İlçe";
  }, [townName]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Misafir`;
    }

    return "Misafir Ekle";
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="
                border-[1px]
                w-full
                md:w-auto
                py-2
                rounded-full
                shadow-sm
                hover:shadow-md
                transition
                cursor-pointer
            "
    >
      <div
        className="
                    flex
                    flex-row
                    items-center
                    justify-between
                "
      >
        <div
          className="
                        text-sm
                        font-semibold
                        px-6   
                    "
        >
          {cityLabel}
        </div>

        <div
          className="
                    text-sm
                    font-semibold
                    px-6 
                    "
        >
          {townLabel}
        </div>

        <div
          className="
                        text-sm
                        pl-6
                        pr-2
                        text-gray-600
                        flex
                        flex-row
                        items-center
                        gap-3
                    "
        >
          <div className="hidden sm:block">{guestLabel}</div>
          <div
            className="
                            p-2
                            bg-rose-500
                            rounded-full
                            text-white
                        "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
