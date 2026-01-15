import { RiHome5Fill } from "react-icons/ri";
import { FaBagShopping } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import SearchBar from "./SearchBar";
import Link from "next/link";
import ShoppingCartIcon from "./ShoppingCartIcon";
const Navbar = () => {
    return (
        <div className="flex justify-between gap-2 items-center border-b border-b-gray-200  p-3 ">

            {/* left */}
            <div className="flex gap-2">
                <FaBagShopping className=" w-6 h-6" />
                <p className="hidden sm:block">ESTORE</p>
            </div>

            {/* right */}
            <div className="flex items-center gap-4   ">
                <SearchBar />
                <Link href="/home"><RiHome5Fill className="hover:text-gray-600" /> </Link>
                <Link href='/notifactions'> <IoIosNotifications className="hover:text-gray-600" /></Link>
                <ShoppingCartIcon/>
                <Link href='/login' className="bg-gray-300 w-20 text-center rounded-md hover:bg-gray-200">sign in</Link>
            </div>
        </div>
    )
}

export default Navbar