"use client";

import { Order } from "@/types/Order.types";
import Image from "next/image";
import React, { useState } from "react";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order } : OrderCardProps) {
  const [isOpen, setIsOpen] = useState(false);

 
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="mb-6 max-w-5xl mx-auto bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-900 rounded-2xl shadow-sm overflow-hidden font-sans">
      
      {/* Header Section */}
      <div className="p-2 md:p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Image Stack Preview */}
          <div className="relative w-16 h-16 bg-gray-200 dark:bg-slate-800 rounded-xl flex items-center justify-center border border-gray-200 dark:border-slate-700">
            <Image
            width={500}
            height={500}
              src={order.cartItems[0]?.product?.imageCover || "/placeholder.png"}
              alt="preview"
              className="w-12 h-12 object-contain rounded"
            />
            {order.cartItems.length > 1 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                +{order.cartItems.length }
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 ${
                order.isDelivered 
                ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-500" 
                : "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-500"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${order.isDelivered ? "bg-green-500" : "bg-amber-500"}`}></span>
                {order.isDelivered ? "Delivered" : "On the way"}
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Order #{order._id.substring(0, 8)}</h3>
            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs mt-1 font-medium">
              <span className="">{formattedDate}</span>
              <span className="text-slate-200 dark:text-slate-700">|</span>
              <span className="text-indigo-500 dark:text-indigo-400 font-semibold">{order.shippingAddress?.city}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="text-right">
            <p className="text-2xl font-black text-slate-900 dark:text-white">
              {order.totalOrderPrice.toLocaleString()} <span className="text-xs font-bold text-slate-400">EGP</span>
            </p>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer py-2 px-6 bg-emerald-500 text-white hover:bg-emerald-600 dark:text-slate-100 rounded-xl text-sm font-bold transition-all active:scale-95 flex items-center gap-2"
          >
            {isOpen ? "Hide" : "Details"}
            <svg className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expandable Content */}
      {isOpen && (
        <div className="border-t border-slate-50 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/50">
          <div className="p-5 md:p-8">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
                 <h4 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Order Items</h4>
              </div>
              <div className="grid gap-3">
                {order.cartItems.map((item) => (
                  <div key={item._id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                      <Image width={50} height={50} src={item.product.imageCover} className="w-14 h-14 object-cover rounded-lg" alt={item.product.title} />
                      <div>
                        <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{item.product.title}</h5>
                        <p className="text-xs font-bold text-indigo-500 mt-1">{item.count} × {item.price} EGP</p>
                      </div>
                    </div>
                    <div className="text-sm font-black">{(item.count * item.price).toLocaleString()} EGP</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 p-6  rounded-2xl border border-slate-100 dark:border-slate-700">
                <h4 className="text-[10px] font-black text-indigo-600 uppercase mb-6">Delivery Address</h4>
                <p className="text-sm font-black  "> <i className="fa-regular fa-user"></i> {order.user?.name}</p>
                <p className="text-xs mt-2 text-slate-500"> {order.shippingAddress?.details}</p>
                <p className="text-xs mt-2 font-bold"> <i className="fa-solid fa-location-dot "></i> {order.shippingAddress?.city}</p>
                <p className="text-xs mt-2 italic"> <i className="fa-solid fa-phone "></i>  Phone: {order.shippingAddress?.phone}</p>
              </div>

              <div className="bg-indigo-600 p-5 rounded-2xl text-white">
                <h4 className="text-[10px] font-black text-indigo-200 uppercase mb-4">Order Summary</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span>Subtotal</span><span>{order.totalOrderPrice - (order.shippingPrice || 0)} EGP</span></div>
                  <div className="flex justify-between border-b border-indigo-500 pb-2"><span>Shipping</span><span>{order.shippingPrice} EGP</span></div>
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-sm font-bold">Total</span>
                    <span className="text-2xl font-black">{order.totalOrderPrice.toLocaleString()} EGP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}