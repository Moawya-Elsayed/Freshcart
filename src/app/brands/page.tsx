
import { getAllBrands } from "@/api/getAllBrands"
import { Brand } from "@/types/cart.type";
import SingleBrand from "../_components/SingleBrands/SingleBrand";

export default async function Brands() {

  const data = await getAllBrands()

  return (
    <section className="py-16">
      <div className="container w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto bg-gray-100 dark:bg-[#020617]">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">

          {/* Left Side */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Our Brands
            </h2>
            <p className="text-gray-600 leading-relaxed">
              You can see our brands and each brand includes the products in it.
            </p>
          </div>

          {/* Right Side */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {data?.map((brand: Brand) => (
              <SingleBrand key={brand._id} brand={brand} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}