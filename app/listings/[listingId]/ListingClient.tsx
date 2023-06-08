"use client";

import getReservations from "@/app/actions/getReservations";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  reservations = [],
  listing,
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [wasReserved, setWasReserved] = useState(true);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    if (
      reservations.find(
        (item) =>
          item.userId === currentUser.id && item.listingId === listing.id
      )
    ) {
      toast.error("Başvuru önceden oluşturulmuştur!");
      setIsLoading(false);
      return;
    }

    axios
      .post("/api/reservations", {
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Rezervasyon alındı!"); // TODO:
        // redirect to trips
        router.push("/reservations");
      })
      .catch(() => {
        toast.error("Bir hata oluştu"); // TODO:
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [listing?.id, router, currentUser, loginModal]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            addressCityTown={listing.address}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="
                        grid
                        grid-cols-1
                        md:grid-cols-7
                        md:gap-10
                        mt-6
                    "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
              startDate={listing.startDate}
              endDate={listing.endDate}
            />
            <div
              className="
                                order-first
                                mb-10
                                md:order-last
                                md:col-span-3
                            "
            >
              <ListingReservation
                onSubmit={onCreateReservation}
                disabled={isLoading}
              />
            </div>
            {/* <div>
              {reservations[0].listingId}
              <hr />
              {reservations[0].id}
              <hr />
              {reservations[0].listing.id}
              <hr />
              {reservations[0].listing.userId}
              <hr />
              {currentUser?.id}
              <hr />
              {reservations[0].userId}
              {(currentUser?.id === reservations[0].userId).toString()}
            </div> */}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
