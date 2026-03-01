import { Order } from "@/types/Order.types";

export async function getUserOrders(userId: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  const data: Order[] = await res.json();

  return data
}