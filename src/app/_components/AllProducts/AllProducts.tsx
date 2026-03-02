            import { getAllProducts } from '@/api/getAllProductsApi.api';
            import SingleProduct from '../SingleProduct/SingleProduct';
            import { Product } from '@/types/product.type';

            export default async function AllProducts() {
                const data = await getAllProducts() ; 
                console.log(data);
                
                return <>
                        <div className="container w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto mt-12 bg-gray-100 dark:bg-[#020617]">
                            <div className="flex flex-wrap">    
                                {data?.map((prod : Product)=>{
                            return <SingleProduct  product={prod} key={prod.id}/>
                        })}
                            </div>
                        </div>  
                        
                        
                        </>
                }
                