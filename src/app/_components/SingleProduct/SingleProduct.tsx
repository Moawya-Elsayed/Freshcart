  import { Card, CardContent, CardDescription,  CardTitle } from "@/components/ui/card";
  import { FaStar } from 'react-icons/fa';
  import Link from 'next/link';
  import Image from 'next/image';
  import { Product } from '@/types/product.type';
  import AddBtn from './../AddBtn/AddBtn';
  import WishlistBtn from "../WishlistBtn/WishlistBtn";

  export default function SingleProduct({ product }: { product: Product }) {
    return (

      <div className="w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 px-2 mb-6">    
      <Card className="p-0 h-full flex flex-col overflow-hidden rounded-lg shadow-lg bg-white dark:bg-[#0f172a] border dark:border-gray-800">
      <Link href={`/products/${product._id}`} className="group relative">
        <div className="relative w-full aspect-4/3 overflow-hidden">
          <Image    
            src={product.imageCover}  
            alt={product.title} 
            fill
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              (max-width:  1280px) 33vw,
              20vw
            "
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <span className="absolute top-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-md">
            New
          </span>
        </div>
      </Link>

      <CardContent className="flex flex-col justify-between flex-1 p-4 text-gray-800 dark:text-gray-200">

        <div className="mb-4">
          <CardDescription className="text-emerald-600 font-semibold mb-1">
            {product.category.name}
          </CardDescription>
          <CardTitle className="font-bold text-lg line-clamp-1">
            {product.title}
          </CardTitle>
        </div>

        <div className="flex justify-between items-center w-full mb-3">
          <span className="font-bold text-lg">{product.price} EGP</span>
          <span className="flex items-center gap-1 text-yellow-500">
            <FaStar /> {product.ratingsAverage}
          </span>
        </div>

        <div className="flex flex-col gap-3 w-full mt-auto">
          <AddBtn
            id={product._id}
            className="w-full bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl text-center uppercase tracking-wide"
          />
          <WishlistBtn
            id={product._id}
            className="w-full border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-semibold py-3 px-6 rounded-lg shadow transition-all transform flex items-center justify-center gap-2 text-center uppercase tracking-wide"
          >
            <span className="text-xl text-red-500 transition-transform duration-300 group-hover:scale-125">❤️</span>
            Wishlist
          </WishlistBtn>
        </div>

        
      </CardContent>
    </Card>
  </div>
    );
  }
