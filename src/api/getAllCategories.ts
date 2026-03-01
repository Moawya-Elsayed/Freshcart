export async function getAllCategories(){
        const res = await fetch ("https://ecommerce.routemisr.com/api/v1/categories")
        if(!res.ok)
            console.log(await res.json());
            

        const {data} = await res.json()

        return data
}