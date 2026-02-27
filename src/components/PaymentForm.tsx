'use client';

import React from 'react';
import { PaymentFormType, paymentFormSchema } from '@/types/paymentForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaLock, FaRegCreditCard } from 'react-icons/fa';

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<PaymentFormType>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardHolderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: ""
    }
  });

  const handlePaymentForm = (data: PaymentFormType) => {
    console.log("Payment Data:", data);
    // Here you would typically integrate with Stripe or a backend API
  };

  const inputStyles = "w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-all placeholder:text-gray-400";
  const labelStyles = "mb-1 block text-xs font-semibold uppercase text-gray-500 tracking-wider";
  const errorStyles = "mt-1 text-xs text-red-500 font-medium";

  return (
    <div className="mx-auto w-full max-w-2xl rounded-xl bg-white p-2 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
        <div className="flex gap-2 text-2xl text-gray-400">
          {/* Mock icons representing card types */}
          <FaRegCreditCard />
        </div>
      </div>

      <form onSubmit={handleSubmit(handlePaymentForm)} className="grid grid-cols-1 gap-5 md:grid-cols-4">

        {/* Card Number - Full Width */}
        <div className="md:col-span-4">
          <label className={labelStyles} htmlFor="cardNumber">Card Number</label>
          <div className="relative">
            <input
              {...register("cardNumber")}
              type="text"
              id="cardNumber"
              placeholder="1234 5678 1234 5678"
              className={`${inputStyles} pl-10`}
            />
            <FaRegCreditCard className="absolute left-3 top-3.5 text-gray-400" />
          </div>
          {errors.cardNumber && <p className={errorStyles}>{errors.cardNumber.message}</p>}
        </div>

        {/* Card Holder - Full Width */}
        <div className="md:col-span-4">
          <label className={labelStyles} htmlFor="cardHolderName">Name on Card</label>
          <input
            {...register("cardHolderName")}
            type="text"
            id="cardHolderName"
            placeholder="John Doe"
            className={inputStyles}
          />
          {errors.cardHolderName && <p className={errorStyles}>{errors.cardHolderName.message}</p>}
        </div>

        {/* Expiry Date - Half Width */}
        <div className="md:col-span-2">
          <label className={labelStyles} htmlFor="expiryDate">Expiry Date</label>
          <input
            {...register("expiryDate")}
            type="text"
            id="expiryDate"
            placeholder="MM/YY"
            className={inputStyles}
          />
          {errors.expiryDate && <p className={errorStyles}>{errors.expiryDate.message}</p>}
        </div>

        {/* CVV - Half Width */}
        <div className="md:col-span-2">
          <label className={labelStyles} htmlFor="cvv">CVV</label>
          <div className="relative">
            <input
              {...register("cvv")}
              type="password"
              id="cvv"
              placeholder="***"
              maxLength={4}
              className={`${inputStyles} pl-10`}
            />
            <FaLock className="absolute left-3 top-3.5 text-gray-400 text-xs" />
          </div>
          {errors.cvv && <p className={errorStyles}>{errors.cvv.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="mt-2 md:col-span-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-4 text-sm font-bold text-white transition-all hover:bg-black active:scale-[0.98] disabled:bg-gray-400"
          >
            <FaLock className="text-xs" />
            {isSubmitting ? "Processing..." : "Complete Order"}
          </button>

          <p className="mt-4 flex items-center justify-center gap-1 text-center text-[10px] text-gray-400 uppercase tracking-widest">
            <FaLock /> Your transaction is encrypted and secure
          </p>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;