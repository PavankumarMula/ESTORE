import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";

const ShoppingCartIcon = ()=>{
    return (
    <>
       <Link href="/cart" className="relative">
        <FaCartShopping className="w-4 h-4 hover:text-gray-600" />
        <span className="absolute -top-4 -right-4 bg-black text-white text-sm rounded-full w-4 flex items-center justify-center">0</span>
       </Link>
    </>
    )
}
export default ShoppingCartIcon;