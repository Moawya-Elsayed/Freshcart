export async function getBrandProducts(brandId:string){
    const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
    )

    const {data} = await res.json()
    return data
}