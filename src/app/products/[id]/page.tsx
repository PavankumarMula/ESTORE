import React from 'react';
import { ProductType } from '@/types/productType';
import Image from 'next/image';
import { FaCcVisa, FaCcStripe, FaCcMastercard, FaCcApplePay } from "react-icons/fa";

import { SiGooglepay } from "react-icons/si";
import ProductInteraction from '@/components/ProductInteraction';


const dummyProduct: ProductType = {
    id: 1,
    name: "Adidas CoreFit T-Shirt",
    shortDescription: "Premium breathable fabric designed for peak athletic performance.",
    description: "The Adidas CoreFit T-Shirt features Aeroready technology that wicks sweat away from your skin to keep you dry.",
    price: 39.9,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["gray", "purple", "green"],
    images: {
        gray: "/products/1g.png",
        purple: "/products/1p.png",
        green: "/products/1gr.png",
    },
}

const ProductPage = async ({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ color?: string; size?: string }>
}) => {
    // 1. Await the promises provided by Next.js
    const { id } = await params;
    const { color, size } = await searchParams;

    // 2. Determine selected values with fallbacks
    const selectedSize = size || dummyProduct.sizes[0];
    const selectedColor = color || dummyProduct.colors[0];

   

    return (
        <div className='flex flex-col gap-4 lg:flex-row md:gap-8 mt-12 px-4 max-w-7xl mx-auto'>
            {/* Image Section */}
            <div className='w-full lg:w-5/12 relative aspect-[2/2.2]'>
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
                    <Image
                        src={dummyProduct.images[selectedColor]}
                        alt={dummyProduct.name}
                        fill
                        className="object-contain rounded-md"
                        priority
                    />
                </div>
            </div>

            {/* Product Details Section */}
            <div className='w-full lg:w-7/12 flex flex-col gap-6'>
                <div className='flex flex-col gap-2'>
                    <h1 className="text-2xl font-medium">{dummyProduct.name}</h1>
                    <p className="font-semibold text-gray-400">${dummyProduct.description}</p>
                    <h2 className='text-2xl font-medium text-gray-600'>${dummyProduct.price.toFixed(2)}</h2>
                </div>

                {/* Interactions */}
                <ProductInteraction product={dummyProduct} selectedColor={selectedColor} selectedSize = {selectedSize}/>
                {/* card info */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                        Secure Checkout Guaranteed
                    </p>

                    <div className="flex flex-wrap gap-3 items-center">
                        {/* Stripe Card */}
                        <div className="flex items-center justify-center w-12 h-8 rounded-md bg-gray-50 border border-gray-100 grayscale hover:grayscale-0 transition-all cursor-default" title="Stripe">
                            <FaCcStripe className="text-2xl text-[#635BFF]" />
                        </div>

                        {/* Visa Card */}
                        <div className="flex items-center justify-center w-12 h-8 rounded-md bg-gray-50 border border-gray-100 grayscale hover:grayscale-0 transition-all cursor-default" title="Visa">
                            <FaCcVisa className="text-2xl text-[#1A1F71]" />
                        </div>

                        {/* Mastercard */}
                        <div className="flex items-center justify-center w-12 h-8 rounded-md bg-gray-50 border border-gray-100 grayscale hover:grayscale-0 transition-all cursor-default" title="Mastercard">
                            <FaCcMastercard className="text-2xl text-[#EB001B]" />
                        </div>

                        {/* Apple Pay */}
                        <div className="flex items-center justify-center w-12 h-8 rounded-md bg-gray-50 border border-gray-100 grayscale hover:grayscale-0 transition-all cursor-default" title="Apple Pay">
                            <FaCcApplePay className="text-2xl text-black" />
                        </div>

                        {/* Google Pay */}
                        <div className="flex items-center justify-center w-12 h-8 rounded-md bg-gray-50 border border-gray-100 grayscale hover:grayscale-0 transition-all cursor-default" title="Google Pay">
                            <SiGooglepay className="text-3xl text-gray-700" />
                        </div>
                    </div>

                    <p className="mt-4 text-[10px] text-gray-400 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></span>
                        SSL Encrypted & 100% Secure Payment Processing
                    </p>
                </div>
                
            </div>
        </div>
    );
};

export default ProductPage;