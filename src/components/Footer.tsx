import { FaBagShopping } from "react-icons/fa6";
import { RiCopyrightLine } from "react-icons/ri";
import Link from "next/link";
export const Footer = () => {
  return (
    <div className="bg-gray-800 w-full text-slate-400 p-4 flex flex-col items-center rounded-2xl">
      {/* Icons info */}
      <div className=" w-full flex flex-col gap-6 items-center sm:flex-row sm:justify-between sm:items-center" >
       
          <div className="flex flex-col justify-center">
          <FaBagShopping />
            <div className="flex items-center">  <RiCopyrightLine /> 2026 ESTORE</div>
            <p>All rights reserved</p>
          </div>
      

        {/* Links info */}
        <div className="flex flex-col items-center gap-1">
          <h4 className="text-xl text-white">Links</h4>
          <Link href="/home">Homepage</Link>
          <Link href="/home">Contact</Link>
          <Link href="/home">Terms of Service</Link>
          <Link href="/home">Privacy Policy</Link>
        </div>

        {/* Products info */}
        <div className="flex flex-col items-center gap-1">
          <h4 className="text-xl text-white">Products</h4>
          <Link href="/home">All Products</Link>
          <Link href="/home">New Arraivals</Link>
          <Link href="/home">Best Sellers</Link>
          <Link href="/home">Sale</Link>
        </div>

        <div className="flex flex-col items-center gap-1">
          <h4 className="text-xl text-white">Company</h4>
          <Link href="/home">About</Link>
          <Link href="/home">Contact</Link>
          <Link href="/home">Blog</Link>
          <Link href="/home">Affiliate Program</Link>
        </div>

      </div>
    </div>
  )
}
