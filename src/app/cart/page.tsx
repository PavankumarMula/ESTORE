'use client';

import { CartItemType } from "@/types/cartItemsType";
import { useSearchParams, useRouter } from "next/navigation";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import ShippingForm from "@/components/ShippingForm";
import PaymentForm from "@/components/PaymentForm";
import { useState } from "react";
import {ShippingFormInputs} from "@/types/ShippingForm"

const steps = [
  { id: 1, title: "Shopping Cart" },
  { id: 2, title: "Shipping Address" },
  { id: 3, title: "Payment Method" },
];

const cartItems: CartItemType[] = [
  {
    id: 1,
    name: "Adidas CoreFit T-Shirt",
    shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit.",
    description: "Full description here...",
    price: 39.9,
    sizes: ["s", "m", "l", "xl", "xxl"],
    colors: ["gray", "purple", "green"],
    images: { gray: "/products/1g.png", purple: "/products/1p.png", green: "/products/1gr.png" },
    quantity: 1,
    selectedSize: "m",
    selectedColor: "gray",
  },
  {
    id: 2,
    name: "Puma Ultra Warm Zip",
    shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit.",
    description: "Full description here...",
    price: 59.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["gray", "green"],
    images: { gray: "/products/2g.png", green: "/products/2gr.png" },
    quantity: 1,
    selectedSize: "l",
    selectedColor: "gray",
  },
  {
    id: 3,
    name: "Nike Air Essentials Pullover",
    shortDescription: "Lorem ipsum dolor sit amet consect adipisicing elit.",
    description: "Full description here...",
    price: 69.9,
    sizes: ["s", "m", "l"],
    colors: ["green", "blue", "black"],
    images: { green: "/products/3gr.png", blue: "/products/3b.png", black: "/products/3bl.png" },
    quantity: 1,
    selectedSize: "l",
    selectedColor: "black",
  },
];

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeStep = searchParams.get("step") ?? "1";
  // This tells TypeScript: "This state starts as null, but it will eventually hold ShippingFormInputs"
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Title */}
      <h1 className="mb-8 text-center text-2xl md:text-3xl font-bold text-gray-900">
        Your Shopping Cart
      </h1>

      {/* Steps */}
      <div className="mb-10 flex items-center justify-start md:justify-center gap-4 overflow-x-auto pb-2 no-scrollbar sm:gap-12 border-b border-gray-100">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => router.push(`?step=${step.id}`, { scroll: false })}
            className={`flex flex-shrink-0 items-center gap-2 border-b-2 pb-4 text-sm transition-all
              ${activeStep === String(step.id)
                ? "border-gray-900 text-gray-900 font-semibold"
                : "border-transparent text-gray-400 hover:text-gray-700"
              }`}
          >
            <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs transition-colors ${activeStep === String(step.id) ? "bg-gray-900 text-white border-gray-900" : "border-gray-300"}`}>
              {step.id}
            </span>
            <span className="whitespace-nowrap">{step.title}</span>
          </button>
        ))}
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">

        {/* Dynamic Left Content Section */}
        <div className="lg:col-span-7">
          {activeStep === "1" && (
            <>
              <h2 className="mb-4 text-xl font-semibold text-gray-800">Cart Items ({cartItems.length})</h2>
              <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex w-full items-center gap-4 sm:gap-6">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 md:h-32 md:w-32">
                        <Image
                          src={item.images[item.selectedColor as keyof typeof item.images]}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>

                      <div className="flex flex-1 flex-col gap-1">
                        <h3 className="text-base font-bold text-gray-900 md:text-lg leading-tight">
                          {item.name}
                        </h3>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs md:text-sm text-gray-500">
                          <p><span className="font-medium text-gray-400">Qty:</span> {item.quantity}</p>
                          <p><span className="font-medium text-gray-400">Size:</span> {item.selectedSize.toUpperCase()}</p>
                          <p><span className="font-medium text-gray-400">Color:</span> {item.selectedColor}</p>
                        </div>
                        <p className="mt-2 text-lg font-bold text-gray-900">${item.price.toFixed(2)}</p>
                      </div>
                    </div>

                    <button
                      className="absolute right-2 top-2 sm:static p-2 text-gray-300 hover:bg-red-50 hover:text-red-600 rounded-full transition-all"
                      aria-label="Remove item"
                    >
                      <MdDelete className="h-6 w-6" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeStep === "2" && <ShippingForm setShippingForm={setShippingForm} />}
          {activeStep === "3" && <PaymentForm />}
        </div>

        {/* Order Summary - Always Visible on right in desktop */}
        <div className="lg:col-span-5">
          <div className="sticky top-6 rounded-2xl bg-white p-6 shadow-xl border border-gray-100">
            <h2 className="mb-6 text-xl font-bold text-gray-900 border-b pb-4">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">$169.70</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping estimate</span>
                <span className="font-medium text-green-600 font-semibold uppercase text-xs tracking-wider">Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax estimate</span>
                <span className="font-medium text-gray-900">$0.00</span>
              </div>

              <div className="mt-6 flex justify-between border-t border-gray-100 pt-4 text-xl font-bold text-gray-900">
                <span>Total Amount</span>
                <span>$169.70</span>
              </div>
            </div>

            {activeStep === "1" && (
              <button
                onClick={() => router.push(`?step=2`)}
                className="mt-8 w-full flex items-center justify-center gap-3 rounded-xl bg-gray-900 px-6 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-black hover:shadow-xl active:scale-[0.98]"
              >
                Proceed to Checkout
                <FaLongArrowAltRight className="h-4 w-4" />
              </button>
            )}

            <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-gray-400">
              Secure Checkout • Fast Delivery
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartPage;