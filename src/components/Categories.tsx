"use client";
import { FaShoppingBag } from "react-icons/fa";
import { IoShirt } from "react-icons/io5";
import { LuFootprints } from "react-icons/lu";
import { FaGlasses } from "react-icons/fa";
import { PiHandbagSimpleFill } from "react-icons/pi";
import { GiLargeDress } from "react-icons/gi";
import { GiSleevelessJacket } from "react-icons/gi";
import { GiBoxingGloveSurprise } from "react-icons/gi";
import { CategoryType } from "@/types/categoryType";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories: CategoryType[] = [
    {
        name: "All",
        icon: <FaShoppingBag className="w-4 h-4" />,
        slug: "all",
    },
    {
        name: "T-shirts",
        icon: <IoShirt className="w-4 h-4" />,
        slug: "t-shirts",
    },
    {
        name: "Shoes",
        icon: <LuFootprints className="w-4 h-4" />,
        slug: "shoes",
    },
    {
        name: "Accessories",
        icon: <FaGlasses className="w-4 h-4" />,
        slug: "accessories",
    },
    {
        name: "Bags",
        icon: <PiHandbagSimpleFill className="w-4 h-4" />,
        slug: "bags",
    },
    {
        name: "Dresses",
        icon: <GiLargeDress className="w-4 h-4" />,
        slug: "dresses",
    },
    {
        name: "Jackets",
        icon: <GiSleevelessJacket className="w-4 h-4" />,
        slug: "jackets",
    },
    {
        name: "Gloves",
        icon: <GiBoxingGloveSurprise className="w-4 h-4" />,
        slug: "gloves",
    },
];
const Categories = () => {
    const searchParams = useSearchParams();
    const selectedCategory = searchParams.get("category");
    const router = useRouter();
    const pathName = usePathname();


    function handleCategory(categoryName:string){
        const params = new URLSearchParams(searchParams);
        params.set("category",categoryName||"all");
        router.push(`${pathName}?${params.toString()}`)
    }

    return (
        <div className="bg-gray-100 grid gap-2 p-2 rounded-2xl mb-4 [grid-template-columns:repeat(auto-fit,minmax(140px,1fr))]">
            {categories.map((category) => (
                <div
                    key={category.slug}
                    onClick={()=>handleCategory(category.slug)}
                    className={`
                    flex items-center justify-center gap-2
                    px-3 py-1 rounded-lg text-sm
                    cursor-pointer transition
                    whitespace-nowrap
                    hover:bg-white *
                    hover:text-gray-900
                    ${selectedCategory === category.slug
                            ? "bg-gray-950 text-white"
                            : "text-gray-600 hover:bg-white/60"}
                   `}
                >
                    {category.icon}
                    <span className="truncate">{category.name}</span>
                </div>
            ))}
        </div>

    )
}

export default Categories
