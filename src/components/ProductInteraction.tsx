'use client'

import useCartStore from "@/store/cartStore";
import { ProductType } from "@/types/productType";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {useReducer, useState} from 'react'
import toast from "react-hot-toast";
import { FaMinus, FaPlus, FaShoppingBag } from "react-icons/fa";


const ProductInteraction = (
    {
        product, 
        selectedColor, 
        selectedSize 
    }:{ 
        product: ProductType,
        selectedColor: string,
        selectedSize: string 
    }) => {
        console.log(selectedColor,selectedSize)

    const {cart,addToCart} = useCartStore();
    const cartItem = cart.find(p=>p.id&&p.selectedColor===selectedColor&&p.selectedSize===selectedSize);
    const [quantity, setQuantity] = useState(cartItem?.quantity||1);
    
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams();


    const handleTypeChange = ({type,value}:{type:string,value:string})=>{
        const params = new URLSearchParams(searchParams.toString())
        params.set(type,value)
        router.push(`${pathName}?${params.toString()}`,{scroll:false})
    }

    // quantity handler
    const handleQuantityChange=(type:"increment"|"decrement")=>{
        if(type==="decrement"){
            if(quantity<1){
                setQuantity(1)
            }else{
                setQuantity(prev=>prev-1)
            }
        }else{
            setQuantity(prev=>prev+1)
        }
    }

    const handleAddToCart = ()=>{
        addToCart({
            ...product,
            selectedColor,
            selectedSize,
            quantity
        })
        toast.success("product added to cart")
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Size Selection */}
            <div className="flex flex-col gap-3">
                <span className="text-sm font-bold uppercase tracking-widest text-gray-900">Select Size</span>
                <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                        <div
                            onClick={() => handleTypeChange({ type: "size", value: size })}
                            key={size}
                            className={`flex items-center justify-center min-w-[3rem] h-10 px-3 text-sm font-bold border-2 rounded-lg cursor-pointer transition-all uppercase
                        ${selectedSize === size
                                    ? "border-black bg-black text-white"
                                    : "border-gray-100 text-gray-400 hover:border-gray-300 hover:text-gray-900"
                                }`}
                        >
                            {size}
                        </div>
                    ))}
                </div>
            </div>

            {/* Color Selection */}
            <div className="flex flex-col gap-3">
                <span className="text-sm font-bold uppercase tracking-widest text-gray-900">Select Color</span>
                <div className="flex gap-4">
                    {product.colors.map((color) => (
                        <div
                            key={color}
                            onClick={() => handleTypeChange({type:"color",value:color})}
                            className={`group flex items-center justify-center w-10 h-10 rounded-full border-2 cursor-pointer transition-all p-0.5
                        ${selectedColor === color
                                    ? "border-black scale-110"
                                    : "border-transparent opacity-60 hover:opacity-100 hover:scale-110"
                                }`}
                            title={color}
                        >
                            <span
                                className="w-full h-full rounded-full shadow-inner"
                                style={{ backgroundColor: color.toLowerCase() }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Quantity Selection */}
            <div className="flex flex-col gap-3">
                <span className="text-sm font-bold uppercase tracking-widest text-gray-900">Quantity</span>
                <div className="flex items-center w-fit border-2 border-gray-100 rounded-full p-1">
                    <button
                      onClick={()=>handleQuantityChange("decrement")}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600 disabled:opacity-30"
                        disabled={quantity <= 1}
                    >
                        <FaMinus className="text-xs" />
                    </button>

                    <span className="w-12 text-center font-bold text-lg select-none">
                        {quantity}
                    </span>

                    <button
                        onClick={() => handleQuantityChange("increment")}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                    >
                        <FaPlus className="text-xs" />
                    </button>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-black text-white py-3 px-6 rounded-full font-bold uppercase tracking-tight text-xs hover:bg-gray-800 transition-all active:scale-[0.95] shadow-md flex items-center justify-center gap-2"
                >
                    <FaShoppingBag className="text-sm" />
                    Add to Bag
                </button>

                {/* Buy Now Button */}
                <button
                    className="flex-1 bg-white text-black border-[1.5px] border-black py-3 px-6 rounded-full font-bold uppercase tracking-tight text-xs hover:bg-gray-50 transition-all active:scale-[0.95]"
                >
                    Buy it Now
                </button>
            </div>
        </div>
    )
}


export default ProductInteraction;
