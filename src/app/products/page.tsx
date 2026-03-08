  import SingleProduct from '../_components/SingleProduct/SingleProduct';
  import { getAllProducts } from '@/api/getAllProductsApi.api';
  import { Product } from '@/types/product.type';


  export default async function Products() {

  const data = await getAllProducts();

    return (
      <>
            <div className="container w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto py-10 bg-gray-100 dark:bg-[#020617]">
              <h1 className="text-3xl font-bold mb-6 text-emerald-600  text-center">Products Page</h1>

              <div className="flex flex-wrap -mx-3">
              {data?.map((prod : Product) => {

                  return (
                        <SingleProduct  key={prod.id} product = {prod}/>
                        
                        )

              })}

              
              </div>  
          </div>
          
      </>
    )
  }
