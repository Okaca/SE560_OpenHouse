"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: number[];
  startDate: Date;
  endDate: Date;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
  startDate,
  endDate,
}) => {
  const coordinates = locationValue;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
                        text-xl
                        font-semibold
                        flex
                        flex-row
                        items-center
                        gap-2
                    "
        >
          <div>{user?.name} tarafından</div>
          <Avatar src={user?.image} />
        </div>
        <div
          className="
                        flex
                        flex-row
                        items-center
                        gap-4
                        font-light
                        text-neutral-500
                    "
        >
          <div>{guestCount} misafir</div>
          <div>{roomCount} oda</div>
          <div>{bathroomCount} banyo</div>
        </div>
        <div
          className="
                        flex
                        flex-row
                        items-center
                        gap-4
                        text-neutral-700
                    "
        >
          <div>
            Başlangıç Tarihi: {" " + startDate.toISOString().split("T")[0]}
          </div>
          <div>Bitiş Tarihi: {" " + endDate.toISOString().split("T")[0]}</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
