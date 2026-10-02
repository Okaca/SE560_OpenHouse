'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return(
        <Image
            onClick={() => router.push('/')}
            alt="Logo"
            className="hidden md:block cursor-pointer"
            height="100"
            width="175"
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/logo_openhouse3.png`} // TODO: logo change
        />    
    );
}

export default Logo;