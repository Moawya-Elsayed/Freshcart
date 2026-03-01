
import { getAllBrands } from "@/api/getAllBrands"
import SingleBrand from "../_components/SingleBrands/SingleBrand"
import { Brand } from "@/types/cart.type";

export default async function Brands() {

  const data = await getAllBrands()

  return (
    <section className="py-16">
      <div className="container w-[80%] mx-auto mt-12 bg-gray-100 dark:bg-[#020617]">

        <div className="grid md:grid-cols-4 gap-10 items-start">

          {/* Left Side */}
          <div className="md:col-span-1">
            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-600 mb-4">
              Our Brands
            </h2>
            <p className="text-gray-600 leading-relaxed">
              You can see our brands and each brand includes the products in it.
            </p>
          </div>

          {/* Right Side */}
          <div className="md:col-span-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {data?.map((brand: Brand) => (
              <SingleBrand key={brand._id} brand={brand} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}