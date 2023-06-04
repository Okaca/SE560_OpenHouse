'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('../Map'), {
    ssr: false
});

interface ListingInfoProps {
    user: SafeUser;
    description: string;
    guestCount: number;
    area_m2: number;
    modelOfVehicle: string;
    modelOfTent: string;
    otelName: string;
    numOfStarsOfOtel: number;
    nameOfCorporation: string;
    nameOfBuilding: string;
    nameOfMosque: string;
    nameOfSehir: string;
    nameOfIlce: string;
    nameOfBolge: string;
    nameOfMahalle: string;
    detailedAdress: string;
    roomCount: number;
    bathroomCount: number;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined
    locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    guestCount,
    area_m2,
    modelOfVehicle,
    modelOfTent,
    otelName,
    numOfStarsOfOtel,
    nameOfCorporation,
    nameOfBuilding,
    nameOfMosque,
    nameOfSehir,
    nameOfIlce,
    nameOfBolge,
    nameOfMahalle,
    detailedAdress,
    roomCount,
    bathroomCount,
    category,
    locationValue
}) => {
    const { getByValue } = useCountries();

    const coordinates = getByValue(locationValue)?.latlng;

    const myCurrentCategory = category?.label

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
                    <div>
                        {guestCount} misafir
                    </div>
                    {((myCurrentCategory !== "Otomobil") && 
                    (myCurrentCategory !== "Minibüs") && 
                    (myCurrentCategory !== "Otobüs")) && 
                        <div>
                            {roomCount} oda
                        </div>  
                    }
                    {((myCurrentCategory !== "Otomobil") && 
                    (myCurrentCategory !== "Minibüs") && 
                    (myCurrentCategory !== "Otobüs")) && 
                        <div>
                            {bathroomCount} banyo
                        </div>
                    }  
                    {((myCurrentCategory === "Otomobil") || 
                    (myCurrentCategory === "Minibüs") || 
                    (myCurrentCategory === "Otobüs") || 
                    (myCurrentCategory === "Tekne") || 
                    (myCurrentCategory === "Gemi")) && 

                        (modelOfVehicle !== '') && 
                        <div>
                            {modelOfVehicle} model
                        </div>
                    } 
                    {(myCurrentCategory === "Çadır") && 
                        <div>
                            {modelOfTent} model
                        </div>
                    } 
                    {(myCurrentCategory === "Otel") && 
                        <div>
                            {otelName} oteli
                        </div> 
                    }
                    {(myCurrentCategory === "Otel") && 
                        <div>
                            {numOfStarsOfOtel} Yıldızlı
                        </div>
                    } 
                    {(myCurrentCategory === "Cami") && 
                        <div>
                            {nameOfMosque} Camisi
                        </div>
                    } 
                    {((myCurrentCategory === "Tesis") ||
                    (myCurrentCategory === "Kamu Binası") || 
                    (myCurrentCategory === "Yurt")) && 
                        <div>
                            {nameOfCorporation} kuruluşu
                        </div>
                    }
                    {((myCurrentCategory === "Tesis") ||
                    (myCurrentCategory === "Kamu Binası") || 
                    (myCurrentCategory === "Yurt")) && 
                        <div>
                            {nameOfBuilding} binası
                        </div>
                    } 
                </div>
            </div>   
            <hr />
            {((nameOfIlce !== '') && (nameOfSehir !== '')) &&
                <div className="text-lg font-light text-neutral-500">
                    {nameOfIlce}/{nameOfSehir}
                </div> &&
                <hr />
            }
            {(detailedAdress !== '') &&
                <div className="text-lg font-light text-neutral-500">
                    Adres Tarifi: {detailedAdress}
                </div> && 
                <hr />
            }
            {category && (
                <ListingCategory 
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            <Map center={coordinates} />
        </div>
    );

    /*
    if (myCurrentCategory === 'Çadır')
    {
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
                        <div>
                            {guestCount} misafir
                        </div>
                        <div>
                            {roomCount} oda
                        </div>
                        { myCurrentCategory === 'Çadır' &&
                            <div>
                                {area_m2} m2
                            </div>
                        }
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
                <div className="text-lg font-light text-neutral-500">
                    {description}
                </div>
                <hr />
                <Map center={coordinates} />
            </div>
        );
    } else if (myCurrentCategory === 'Otomobil') {
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
                        <div>
                            {guestCount} misafir
                        </div>
                        <div>
                            {modelOfVehicle} marka
                        </div>
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
                <div className="text-lg font-light text-neutral-500">
                    {description}
                </div>
                <hr />
                <Map center={coordinates} />
            </div>
        );        
    } else {
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
                        <div>
                            {guestCount} misafir
                        </div>
                        <div>
                            {roomCount} oda
                        </div>
                        <div>
                            {bathroomCount} banyo
                        </div>
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
                <div className="text-lg font-light text-neutral-500">
                    {description}
                </div>
                <hr />
                <Map center={coordinates} />
            </div>
        );
    }
    */
}

export default ListingInfo;