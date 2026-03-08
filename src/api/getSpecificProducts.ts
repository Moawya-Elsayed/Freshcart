
export async function getProductDetails(id: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`, {
      cache: "no-store"  
    });
    if (!res.ok) {
      throw new Error("Failed to fetch product details");
    }
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("getProductDetails error:", error);
    return null; 
  }
}