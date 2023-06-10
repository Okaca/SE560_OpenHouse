import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { mailOptions, transporter } from "@/app/mailService/nodemailer";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    listingId,
    listingTitle,
    listingAddress,
    listingUserMail,
    listingUserName,
  } = body;

  if (!listingId) {
    return NextResponse.error();
  }

  try {
    const info = await transporter.sendMail({
      ...mailOptions,
      to: listingUserMail,
      subject: "OpenHouse'dan Merhabalar",
      text: "Bir Başvuru bildiriminiz var!!",
      html: `<strong>Bir Başvuru bildiriminiz var!!</strong><p>Merhaba ${listingUserName}!</p>
      <p>Size müjdeli bir haberimiz var! ${currentUser.email} tarafından ${listingTitle} başlıklı ${listingAddress.cityName}, ${listingAddress.townName}'da bulunan paylaşımınıza başvuru aldınız! </p>
      <p>Bir an önce görüşmenizi ümit ediyoruz, esenlikler dileriz!</p>`,
    });
    console.log(info.response);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation);
}
