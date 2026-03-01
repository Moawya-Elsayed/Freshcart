
export async function getAllProducts(){
        const res = await fetch ("https://ecommerce.routemisr.com/api/v1/products")
        if(!res.ok){
            const msg = await res.json();
            console.log(msg);

            throw new Error(msg.message)


        }

        const {data} = await res.json()

        return data
}


