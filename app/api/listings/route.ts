import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title, 
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
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
        location,
        price
    } = body;

    let listing;
    if (category === 'Çadır')
    {
        listing = await prisma.listing.create({
            data: {
                title, 
                description,
                imageSrc,
                category,
                roomCount,
                bathroomCount,
                guestCount,
                area_m2,
                modelOfTent,
                nameOfSehir,
                nameOfIlce,
                nameOfBolge,
                nameOfMahalle,
                detailedAdress,
                locationValue: location.value,
                price: parseInt(price, 10),
                userId: currentUser.id 
            }
        });
    }
    else if ((category === 'Tekne') || 
    (category === 'Gemi'))
    {
        listing = await prisma.listing.create({
            data: {
                title, 
                description,
                imageSrc,
                category,
                roomCount,
                bathroomCount,
                guestCount,
                area_m2,
                modelOfVehicle,
                nameOfSehir,
                nameOfIlce,
                nameOfBolge,
                nameOfMahalle,
                detailedAdress,
                locationValue: location.value,
                price: parseInt(price, 10),
                userId: currentUser.id 
            }
        });
    }
    else if ((category === 'Otomobil') || 
    (category === 'Minibüs') || 
    (category === 'Otobüs'))
    {
        listing = await prisma.listing.create({
            data: {
                title, 
                description,
                imageSrc,
                category,
                roomCount,
                bathroomCount,
                guestCount,
                modelOfVehicle,
                nameOfSehir,
                nameOfIlce,
                nameOfBolge,
                nameOfMahalle,
                detailedAdress,
                locationValue: location.value,
                price: parseInt(price, 10),
                userId: currentUser.id 
            }
        });
    }
    else if (category === 'Otel')
    {
        listing = await prisma.listing.create({
            data: {
                title, 
                description,
                imageSrc,
                category,
                roomCount,
                bathroomCount,
                guestCount,
                area_m2,
                otelName,
                numOfStarsOfOtel,
                nameOfSehir,
                nameOfIlce,
                nameOfBolge,
                nameOfMahalle,
                detailedAdress,
                locationValue: location.value,
                price: parseInt(price, 10),
                userId: currentUser.id 
            }
        });
    }
    else if ((category === 'Yurt') || (category === 'Tesis') || (category === 'Kamu Binası'))
    {
        listing = await prisma.listing.create({
            data: {
                title, 
                description,
                imageSrc,
                category,
                roomCount,
                bathroomCount,
                guestCount,
                area_m2,
                nameOfBuilding,
                nameOfCorporation,
                nameOfSehir,
                nameOfIlce,
                nameOfBolge,
                nameOfMahalle,
                detailedAdress,
                locationValue: location.value,
                price: parseInt(price, 10),
                userId: currentUser.id 
            }
        });
    }
    else if (category === 'Cami')
    {
        listing = await prisma.listing.create({
            data: {
                title, 
                description,
                imageSrc,
                category,
                roomCount,
                bathroomCount,
                guestCount,
                area_m2,
                nameOfMosque,
                nameOfSehir,
                nameOfIlce,
                nameOfBolge,
                nameOfMahalle,
                detailedAdress,
                locationValue: location.value,
                price: parseInt(price, 10),
                userId: currentUser.id 
            }
        });
    }
    else // konteyner - ev - bungalov - karavan
    {
        listing = await prisma.listing.create({
            data: {
                title, 
                description,
                imageSrc,
                category,
                roomCount,
                bathroomCount,
                guestCount,
                area_m2,
                nameOfSehir,
                nameOfIlce,
                nameOfBolge,
                nameOfMahalle,
                detailedAdress,
                locationValue: location.value,
                price: parseInt(price, 10),
                userId: currentUser.id 
            }
        });
    }


    return NextResponse.json(listing);
}