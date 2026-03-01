"use client";
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import { getUserOrders } from "@/api/getUserOrders";
import { Order } from "@/types/Order.types";
import OrderCard from "./orderCard";



export default function OrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
        useEffect(() => {
        if (!session) {
            function flag(){
              setLoading(false);
            }
            flag()
            return;
        }

        if (session?.user?.id) {
            getUserOrders(session?.user?.id).then((res) => {
            setOrders(res);
            setLoading(false);
            });
        }
        }, [session]);

  if (loading) return   <> <div className="min-h-[60vh] flex items-center justify-center">
                                <div className="sk-chase scale-125">
                                    <div className="sk-chase-dot"></div>
                                    <div className="sk-chase-dot"></div>
                                    <div className="sk-chase-dot"></div>
                                    <div className="sk-chase-dot"></div>
                                    <div className="sk-chase-dot"></div>
                                    <div className="sk-chase-dot"></div>
                                </div>
                            </div>
                        </> 


  return (
  <div className="min-h-screen bg-gray-50 shadow-lg hover:shadow-xl dark:bg-[#020617] py-10 px-4">

    {/* Header */}
    <div className="max-w-6xl mx-auto mb-10">
      <h1 className="text-3xl md:text-4xl font-black text-emerald-600 dark:text-emerald-400">
        My Orders
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        Track your orders and view details of each purchase
      </p>
    </div>

    {/* Stats Bar */}
    <div className="max-w-6xl mx-auto mb-8 grid grid-cols-2 md:grid-cols-3 gap-4">

      <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl shadow-sm border dark:border-slate-800">
        <p className="text-sm text-gray-500">Total Orders</p>
        <p className="text-2xl font-bold text-emerald-600">
          {orders?.length?? 0}
        </p>
      </div>

      <div className="bg-white dark:bg-[#0f172a] p-5 rounded-2xl shadow-sm border dark:border-slate-800">
        <p className="text-sm text-gray-500">Status</p>
        <p className="text-lg font-bold text-yellow-500">
          {orders.length > 0 ? "Active Orders" : "No Active Orders"}
        </p>
      </div>

      <div className="hidden md:block bg-white dark:bg-[#0f172a] p-5 rounded-2xl shadow-sm border dark:border-slate-800">
        <p className="text-sm text-gray-500">Customer Support</p>
        <p className="text-sm font-semibold text-emerald-600">
          24/7 Available
        </p>
      </div>

    </div>

    {/* Orders List */}
    <div className="max-w-6xl mx-auto space-y-6">

      {orders.length > 0 ? (
        orders.map((order: Order) => (
          <div
            key={order._id}
            className="transform transition hover:scale-[1.01] duration-300"
          >
            <OrderCard order={order} />
          </div>
        ))
      ) : (
        <div className="text-center py-20 bg-white dark:bg-[#0f172a] rounded-3xl border dark:border-slate-800">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
            No orders found
          </h2>
          <p className="text-gray-500 mt-2">
            Start shopping and your orders will appear here
          </p>
        </div>
      )}

    </div>
  </div>
)

}