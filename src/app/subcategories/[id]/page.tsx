import SingleProduct from "@/app/_components/SingleProduct/SingleProduct"
import { getSpecificSubcategory } from "@/api/getSpecificSubCategory"
import { getProductsBySubcategory } from "@/api/getProductsBySubcategory"
import { getSubcategoriesInCategory } from "@/api/getSubcategoriesInCategory"
import { Product } from "@/types/product.type"

export default async function SubcategoryDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params

  const subcategory = await getSpecificSubcategory(id)
  const products = await getProductsBySubcategory(id)
  await getSubcategoriesInCategory(id)


  return (
    <div className="container w-[80%] mx-auto mt-12 bg-gray-100 dark:bg-[#020617]">

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">
          {subcategory.name}
        </h1>
      </div>

      <div className="flex flex-wrap">
        {products.map((p: Product) => (
          <SingleProduct key={p._id} product={p} />
        ))}
      </div>

    </div>
  )
}