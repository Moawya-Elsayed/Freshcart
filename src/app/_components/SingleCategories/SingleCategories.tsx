  import Link from "next/link"
  import Image from "next/image"
import { Category } from "@/types/category.type"

  export default function SingleCategory({category,}: {category: Category})
  
  {
    return (
      <div className="w-1/2  sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-8">
        <Link href={`/categories/${category._id}`}>

          <div className="group bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-200 dark:border-gray-800 p-5 flex flex-col items-center text-center">

            <div className="w-full h-36 flex items-center justify-center mb-4 overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                width={180}
                height={180}
                className="object-contain w-full h-full 
                group-hover:scale-110 transition duration-300"
              />
            </div>

            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400  
            group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition duration-300 line-clamp-2">
              {category.name}
            </h3>

          </div>
        </Link>
      </div>
    )
  }