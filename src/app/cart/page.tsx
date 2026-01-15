'use client';

import { CartItemType } from "@/types/cartItemsType";
import { useSearchParams, useRouter } from "next/navigation";
import { FaLongArrowAltRight } from "react-icons/fa";

// steps
const steps = [
  { id: 1, title: "Shopping Cart" },
  { id: 2, title: "Shipping Address" },
  { id: 3, title: "Payment Method" },
];

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeStep = searchParams.get("step") ?? "1";

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">

      {/* Title */}
      <h1 className="mb-6 text-center text-2xl font-semibold">
        Your Shopping Cart
      </h1>

      {/* Steps */}
      <div className="mb-8 flex justify-center gap-6 sm:gap-12">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() =>
              router.push(`?step=${step.id}`, { scroll: false })
            }
            className={`flex items-center gap-1 border-b-2 pb-1 text-sm transition
              ${
                activeStep === String(step.id)
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
          >
            <span className="font-medium">{step.id}.</span>
            <span>{step.title}</span>
          </button>
        ))}
      </div>

      {/* Cart layout */}
      <div className="flex flex-col gap-6 md:flex-row">

        {/* Cart Items */}
        <div className="w-full md:w-7/12 rounded-lg shadow-2xl p-4">
          <h2 className="mb-4 text-lg font-medium">Cart Items</h2>

          <div className="text-sm text-gray-500">
            Cart items list goes here
          </div>
        </div>

        {/* Cart Summary */}
        <div className="w-full md:w-5/12 rounded-lg shadow-2xl shadow-gray-500 p-4">
          <h2 className="mb-4 text-lg font-medium">Order Summary</h2>

          <div className="flex flex-col gap-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$169.70</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="flex justify-between border-t pt-2 font-semibold text-gray-900">
              <span>Total</span>
              <span>$169.70</span>
            </div>
          </div>
          {activeStep==="1" &&
          <button  
          onClick={()=>router.push(`?step=2`)}
          className="mt-4 w-full flex items-center justify-center gap-2 rounded-md bg-gray-900 py-2 text-sm text-white hover:bg-gray-800 transition">
            Continue
            <FaLongArrowAltRight/>
          </button>
          }
        </div>

      </div>
    </div>
  );
};

export default CartPage;
