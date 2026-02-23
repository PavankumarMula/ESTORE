'use client';

import React from 'react';
import { useForm ,SubmitHandler} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShippingFormInputs, shippingFormSchema } from '@/types/ShippingForm';
import { useRouter } from 'next/navigation';

const ShippingForm = ({ setShippingForm }: { setShippingForm :(data:ShippingFormInputs)=>void}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ShippingFormInputs>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      pincode: "",
      city: "",
    }
  });

  const router = useRouter();

  const handleShippingForm: SubmitHandler<ShippingFormInputs> = (data: ShippingFormInputs) => {
    console.log("Shipping Data:", data);
    setShippingForm(data);
    router.push("/cart?step=3",{scroll:false})
    // Move to next step or call API
  };

  // Reusable Input Style
  const inputStyles = "w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-all";
  const labelStyles = "mb-1 block text-xs font-semibold uppercase text-gray-500";
  const errorStyles = "mt-1 text-xs text-red-500 font-medium";

  return (
    <div className="mx-auto w-full max-w-2xl rounded-xl bg-white p-2 md:p-6">
      <h2 className="mb-6 text-xl font-bold text-gray-900">Shipping Information</h2>

      <form onSubmit={handleSubmit(handleShippingForm)} className="grid grid-cols-1 gap-4 md:grid-cols-2">

        {/* Full Width: Name */}
        <div className="md:col-span-2">
          <label className={labelStyles} htmlFor="name">Full Name</label>
          <input
            {...register("name")}
            type="text" id="name" placeholder="John Doe"
            className={inputStyles}
          />
          {errors.name && <p className={errorStyles}>{errors.name.message}</p>}
        </div>

        {/* Half Width: Email */}
        <div className="md:col-span-1">
          <label className={labelStyles} htmlFor="email">Email Address</label>
          <input
            {...register("email")}
            type="email" id="email" placeholder="john@example.com"
            className={inputStyles}
          />
          {errors.email && <p className={errorStyles}>{errors.email.message}</p>}
        </div>

        {/* Half Width: Phone */}
        <div className="md:col-span-1">
          <label className={labelStyles} htmlFor="phone">Phone Number</label>
          <input
            {...register("phone")}
            type="tel" id="phone" placeholder="9876543210"
            className={inputStyles}
          />
          {errors.phone && <p className={errorStyles}>{errors.phone.message}</p>}
        </div>

        {/* Full Width: Address */}
        <div className="md:col-span-2">
          <label className={labelStyles} htmlFor="address">Street Address</label>
          <input
            {...register("address")}
            type="text" id="address" placeholder="123 Main St, Apartment 4B"
            className={inputStyles}
          />
          {errors.address && <p className={errorStyles}>{errors.address.message}</p>}
        </div>

        {/* Half Width: City */}
        <div className="md:col-span-1">
          <label className={labelStyles} htmlFor="city">City</label>
          <input
            {...register("city")}
            type="text" id="city" placeholder="Hyderabad"
            className={inputStyles}
          />
          {errors.city && <p className={errorStyles}>{errors.city.message}</p>}
        </div>

        {/* Half Width: Pincode */}
        <div className="md:col-span-1">
          <label className={labelStyles} htmlFor="pincode">Pincode</label>
          <input
            {...register("pincode")}
            type="text" id="pincode" placeholder="500001"
            className={inputStyles}
          />
          {errors.pincode && <p className={errorStyles}>{errors.pincode.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="mt-4 md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-gray-900 py-4 text-sm font-bold text-white transition-all hover:bg-black active:scale-[0.99] disabled:bg-gray-400"
          >
            {isSubmitting ? "Saving..." : "Save & Continue"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default ShippingForm;