import Image from "next/image"
import SingleProduct from "@/app/_components/SingleProduct/SingleProduct"
import { getSpecificCategory } from "@/api/getSpecificCategories"
import { getProductsByCategory } from "@/api/getProductsByCategory"
import { getSubcategoriesInCategory } from "@/api/getSubcategoriesInCategory"
import Link from "next/link"
import { Category } from "@/types/category.type"
import { Product } from "@/types/product.type"
import { Subcategory } from "@/types/subcategory.type"

export default async function CategoryDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params

const [category, products, subcategories]: [
  Category,
  Product[],
  Subcategory[]
] = await Promise.all([

  getSpecificCategory(id),
  getProductsByCategory(id),
  getSubcategoriesInCategory(id),
])

  return (


    <div className="container w-[80%] mx-auto mt-12 bg-gray-100 dark:bg-[#020617]">

      {/* Category Header */}
      <div className="text-center mb-14">

        <Image
          src={category.image}
          alt={category.name}
          width={200}
          height={200}
          className="
            mx-auto mb-6 object-contain
            rounded-2xl shadow-lg
            bg-white dark:bg-[#0f172a]
            p-4
          "
        />

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {category.name}
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Explore all products in this category
        </p>

      </div>

      {/* Products Section */}
      <div className="flex flex-wrap">
        {products.length > 0 ? (
          products.map((product: Product) => (
            <SingleProduct key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center w-full text-gray-500 dark:text-gray-400 py-20">
            No products found in this category.
          </p>
        )}
      </div>

      {/* Subcategories */}
      <div className="mt-20">

        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
          Subcategories
        </h2>

        <div className="flex flex-wrap gap-4">

          {subcategories.map((sub: Subcategory) => (
            <Link
              key={sub._id}
              href={`/subcategories/${sub._id}`}
              className="
                px-6 py-3 rounded-xl
                border border-gray-200 dark:border-gray-800
                text-gray-700 dark:text-gray-200
                bg-white dark:bg-[#0f172a]
                hover:bg-emerald-50 dark:hover:bg-emerald-950
                shadow-sm hover:shadow-md
                transition-all duration-300
              "
            >
              {sub.name}
            </Link>
          ))}

        </div>

      </div>

    </div>
  
  )
}