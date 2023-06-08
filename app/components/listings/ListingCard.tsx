"use client"; // because of using router

import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const m2 = useMemo(() => {
    return data.m2;
  }, []);

  const reservationDate = useMemo(() => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="
                col-span-1 cursor-pointer group
            "
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
                        aspect-square
                        w-full
                        relative
                        overflow-hidden
                        rounded-xl"
        >
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="
                        object-cover
                        h-full
                        w-full
                        group-hover:scale-110
                        transition
                    "
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {data.address?.cityName}, {data.address?.townName}
        </div>
        <div className=" text-neutral-700">{data.category}</div>
        <div className=" text-neutral-700">{reservationDate}</div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">{m2}</div>
          <div className="font-light">metrekare</div>
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
