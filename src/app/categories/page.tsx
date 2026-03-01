import { getAllCategories } from "@/api/getAllCategories"
import SingleCategory from "../_components/SingleCategories/SingleCategories"
import { Category } from "@/types/category.type";

export default async function CategoriesPage() {

  const categories = await getAllCategories()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl text-blue-600 font-bold text-center mb-10">
        Categories
      </h1>

      <div className="flex flex-wrap">
        {categories?.map((cat: Category) => (
          <SingleCategory key={cat._id} category={cat} />
        ))}
      </div>
    </div>
  )
}