'use client'
import Image from "next/image";
import { ProductType } from "@/types/productType";
import { BiCartAdd } from "react-icons/bi";
import { useState } from "react";

const ProductCard = ({ product }: { product: ProductType }) => {
  // state
  const [productType, setproductType] = useState({
    size: product.sizes[0],
    color: product.colors[0]
  })

  // handler 
  const handleProductType = ({ type, value }: { type: "color"|"size", value: string }) => {
    setproductType(prev=>({...prev,[type]:value}))
  }
  return (
    <div className="group flex flex-col rounded-xl bg-white shadow-sm hover:shadow-lg transition">
      {/* Image */}
      <div className="relative h-56 sm:h-64 md:h-72 bg-gray-100 rounded-t-xl">
        <Image
          src={product.images[productType.color]}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">

        {/* Title */}
        <h2 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-1">
          {product.name}
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Options */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          {/* Size */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">
              Size
            </label>

            <select
              value={productType.size}
              onChange={(e) =>
                handleProductType({ type: "size", value: e.target.value })
              }
              className="border rounded-md px-2 py-1 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-gray-900"
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Colors */}
          <div className="flex gap-2 items-center">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() =>
                  handleProductType({ type: "color", value: color })
                }
                className={`h-5 w-5 rounded-full border transition
                  ${
                    productType.color === color
                      ? "ring-2 ring-gray-900"
                      : "hover:ring-2 hover:ring-gray-400"
                  }`}
                style={{ backgroundColor: color }}
                aria-label={`Select ${color}`}
              />
            ))}
          </div>

        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between pt-3">
          <p className="text-base sm:text-lg font-semibold text-gray-900">
            ${product.price}
          </p>

          <button
            className="flex items-center gap-1 rounded-md bg-gray-950 px-3 py-1.5
                       text-xs sm:text-sm text-white transition hover:bg-gray-800"
          >
            <BiCartAdd className="text-base" />
            Add
          </button>
        </div>

      </div>
    </div>
  );
};


export default ProductCard;
