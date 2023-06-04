"use client";

import Button from "../Button";

interface ListingReservationProps {
  onSubmit: () => void;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  onSubmit,
}) => {
  return (
    <div
      className="
                bg-white
                rounded-xl
                border-[1px]
                border-neutral-200
                overflow-hidden
            "
    >
      <div
        className="
                flex flex-row items-center gap-1 p-4
            "
      ></div>

      <div className="p-4">
        <Button
          label={"Rezervasyon Yap"} // TODO: istek gönder gibi bir şeye dönüştürülebilir
          onClick={onSubmit}
        />
      </div>
      <div
        className="
                p-4
                flex
                flex-row
                items-center
                justify-between
                font-semibold
                text-lg
            "
      ></div>
    </div>
  );
};

export default ListingReservation;
