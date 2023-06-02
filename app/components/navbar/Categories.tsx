'use client';

import Container from "../Container";

import { TbHome, TbBus, TbSpeedboat } from "react-icons/tb";
import { GiCampingTent, GiCargoCrate } from "react-icons/gi";
import { FaHotel, FaCaravan } from "react-icons/fa";
import { MdOutlineNightShelter, MdOutlineBungalow, MdApartment, MdOutlineMosque } from "react-icons/md"
import { AiFillCar } from "react-icons/ai";
import { RiBus2Line, RiShipLine } from "react-icons/ri";
import { BsBuildings } from "react-icons/bs";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
 
export const categories = [
    {
        label: 'Çadır',
        icon: GiCampingTent,
        description: 'Barınma tipi Çadır!'
    },
    {
        label: 'Konteyner',
        icon: GiCargoCrate,
        description: 'Barınma tipi Konteyner!'
    },
    {
        label: 'Tekne',
        icon: TbSpeedboat,
        description: 'Barınma tipi Tekne!'
    },
    {
        label: 'Gemi',
        icon: RiShipLine,
        description: 'Barınma tipi Gemi!'
    },
    {
        label: 'Ev',
        icon: TbHome,
        description: 'Barınma tipi Ev!'
    },
    {
        label: 'Otomobil',
        icon: AiFillCar,
        description: 'Barınma tipi Otomobil!'
    },
    {
        label: 'Minibüs',
        icon: TbBus,
        description: 'Barınma tipi Minibüs!'
    },
    {
        label: 'Otobüs',
        icon: RiBus2Line,
        description: 'Barınma tipi Otobüs!'
    },
    {
        label: 'Karavan',
        icon: FaCaravan,
        description: 'Barınma tipi Karavan!'
    },
    {
        label: 'Otel',
        icon: FaHotel,
        description: 'Barınma tipi Otel!'
    },
    {
        label: 'Tesis',
        icon: MdOutlineNightShelter,
        description: 'Barınma tipi Tesis!'
    },
    {
        label: 'Bungalov',
        icon: MdOutlineBungalow,
        description: 'Barınma tipi Bungalov!'
    },
    {
        label: 'Yurt',
        icon: MdApartment,
        description: 'Barınma tipi Yurt!'
    },
    {
        label: 'Kamu Binası',
        icon: BsBuildings,
        description: 'Barınma tipi Kamu Binası!'
    },
    {
        label: 'Cami',
        icon: MdOutlineMosque,
        description: 'Barınma tipi Cami!'
    },
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname(); 

    const isMainPage = pathname === '/';

    if(!isMainPage) {
        return null;
    }

    return(
        <Container>
            <div
                className="
                    pt-4
                    flex
                    flex-row
                    items-center
                    justify-between
                    overflow-x-auto
                "
            >
                {categories.map((item) => (
                    <CategoryBox 
                        key={item.label}
                        label={item.label}
                        selected={category === item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
}

export default Categories;