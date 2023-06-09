import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  cityName?: string;
  townName?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const { userId, guestCount, cityName, townName, category } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    if (cityName) {
      query.address = {
        equals: {
          cityName: cityName,
          townName: "Süleymanpaşa",
          districtName: "Merkez",
          neighborhoodName: "Çınarlı Mh.",
        },
      };
    }

    // if (townName) {
    //   query.address = {
    //     equals: [{ townName: townName }],
    //   };
    // }

    console.log(query);

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
