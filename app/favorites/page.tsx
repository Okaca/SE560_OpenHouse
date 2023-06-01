import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListing";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="Kaydedilenler boş"
                    subtitle="Henüz kaydedilmiş bir öge yok"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <FavoritesClient 
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default ListingPage;