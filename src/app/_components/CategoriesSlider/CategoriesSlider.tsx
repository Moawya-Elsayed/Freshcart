import React from 'react'
;
import CategoriesSwipper from '../CategoriesSwipper/CategoriesSwipper';

export default async function CategoriesSlider() {

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories" ,
        { cache: "no-store" }
    )
    const {data} = await res.json()
    console.log(data);
    
    return <>
            
            <CategoriesSwipper categories={data}/>
            
            
            </>
}
