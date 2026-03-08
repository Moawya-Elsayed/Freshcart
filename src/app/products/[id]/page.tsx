    import { getProductDetails } from '@/api/getSpecificProducts';
    import { FaStar } from 'react-icons/fa';
    import Image from 'next/image';
    import AddBtn from "@/app/_components/AddBtn/AddBtn";
    import WishlistBtn from '@/app/_components/WishlistBtn/WishlistBtn';
    import ProductReviews from "@/app/_components/ProductReviews/ProductReviews"
    import { getRelatedProducts } from '@/ProductCategoryAction/relatedProducts.action';
    import SingleProduct from '@/app/_components/SingleProduct/SingleProduct';
    import { Product } from '@/types/product.type';

        export default async function ProductDetails({
        params
        }: {
        params: { id: string }
        }) {

        const { id } = await params
        const data = await getProductDetails(id);

        if(!data) return <h1>No Product details here</h1>
        const res = await getRelatedProducts(data.category._id)
        

        if (!data) {
            return <div className="text-center py-20">Product not found</div>
            }
        return (
            <div className="container w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto my-10 px-4 max-w-6xl min-h-screen bg-gray-100 dark:bg-[#020617] dark:border-t dark:border-white/5">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* product image*/}
                    <div className="lg:w-1/3 w-full flex justify-center items-center">
                        <div className="w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md bg-white dark:bg-[#0f172a] dark:shadow-xl dark:shadow-black/40">
                            <Image src={data?.imageCover || "/placeholder.png" } width={500} height={500} alt="data title" className="w-full h-70 sm:h-80 md:h-90 lg:h-100 object-contain transition-transform duration-300 hover:scale-105"/>
                        </div>
                    </div>

                    {/* product description */}
                    <div className="lg:w-2/3 w-full flex flex-col justify-between">
                        <div className="space-y-5">
                            <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{data.title}</h2>
                            <p className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-600 dark:text-gray-400">{data.description}</p>
                            <h3 className="text-lg sm:text-lg md:text-xl text-emerald-500 dark:text-emerald-400 font-semibold">{data.category.name}</h3>

                            <div className="flex items-center justify-between mt-5">
                                <span className="text-xl sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">{data.price} EGP</span>
                                <span className="flex items-center gap-1 text-yellow-500 text-base md:text-lg"> <FaStar /> {data.ratingsAverage} </span>
                            </div>
                        </div>

                        <div className="mt-5 flex flex-col sm:flex-row gap-4">
                            <AddBtn id={data._id} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105 shadow-lg" />
                            <WishlistBtn id={data._id} className="border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105" />
                        </div>
                    </div>
                </div>

                <div className="container w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto mt-12 px-4">
                    <h2 className="my-7  text-emerald-500 text-3xl font-bold mb-8">
                        Related <span className="text-emerald-500">Products</span>
                    </h2>

                    <div className="flex flex-wrap">
                        {res.data?.map((prod: Product) => (
                            <SingleProduct product={prod} key={prod.id} />
                        ))}
                    </div>
                </div>
                                
                <ProductReviews productId={data._id} />
            </div>

            
        );
    }

