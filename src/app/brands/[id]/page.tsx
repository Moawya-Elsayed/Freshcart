
import { getSpecificBrand } from "@/api/getSpecificBrands"
import { getBrandProducts } from "@/api/getPrandProduct"
import Image from "next/image"
import SingleProduct from "@/app/_components/SingleProduct/SingleProduct"
import { Product } from "@/types/product.type"

export default async function BrandPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params

  const brand = await getSpecificBrand(id)
  const products = await getBrandProducts(id)

  return (
    <div className="
      min-h-screen
      bg-gray-50
      dark:bg-linear-to-b dark:from-[#020617] dark:to-[#0a1229]
      transition-all duration-500
    ">

      {/* ================= Banner ================= */}
      <div className="
        relative h-72
        bg-linear-to-r from-emerald-600 via-emerald-500 to-emerald-400
        dark:from-emerald-900 dark:via-[#0f172a] dark:to-[#020617]
        flex items-center justify-center text-white
        overflow-hidden
      ">

        <div className="absolute inset-0 bg-black/30 dark:bg-black/60" />

        <div className="relative z-10 text-center animate-fadeIn">

          {/* Brand Logo */}
          <div className="
            relative w-40 h-40
            bg-white dark:bg-[#0f172a]
            rounded-2xl
            shadow-2xl
            p-6 mx-auto mb-6
            backdrop-blur-lg
            border border-white/20
            dark:border-gray-800
            transition-transform duration-500 hover:scale-105
          ">
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              className="object-contain"
            />
          </div>

          <h1 className="
            text-4xl font-bold mb-2
            drop-shadow-lg
            text-white
            dark:text-emerald-300
          ">
            {brand.name}
          </h1>

          <p className="text-lg text-gray-100 dark:text-gray-300">
            Discover all products from {brand.name}
          </p>

        </div>
      </div>

      {/* ================= Brand Info ================= */}
      <div className="container w-[90%] mx-auto py-12">

        <div className="
          bg-white/70 dark:bg-[#0f172a]/70
          backdrop-blur-xl
          rounded-2xl
          shadow-xl
          p-6
          max-w-2xl mx-auto
          border border-gray-200/40 dark:border-gray-800
          space-y-3
          transition-all duration-500
        ">

          <InfoRow label="Brand ID" value={brand._id} />
          <InfoRow label="Slug" value={brand.slug} />
          <InfoRow
            label="Created"
            value={new Date(brand.createdAt).toLocaleDateString()}
          />
          <InfoRow
            label="Updated"
            value={new Date(brand.updatedAt).toLocaleDateString()}
          />

        </div>
      </div>

      {/* ================= Products ================= */}
      <div className="container w-[90%] mx-auto pb-16 max-w-7xl">

        <div className="flex items-center justify-between mb-10">

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Products
          </h2>

          <span className="
            bg-emerald-100 dark:bg-emerald-950
            text-emerald-700 dark:text-emerald-400
            px-4 py-1 rounded-full text-sm
          ">
            {products?.length || 0} Products
          </span>

        </div>

        {products?.length > 0 ? (
          <div className="flex flex-wrap -mx-3 animate-fadeIn">
            {products?.map((prod: Product) => (
              <SingleProduct key={prod._id} product={prod}/>
            ))}
          </div>
        ) : (
          <div className="
            text-center py-20
            bg-white/70 dark:bg-[#0f172a]/70
            backdrop-blur-xl
            rounded-xl shadow-xl
            border dark:border-gray-800
          ">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              No Products Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              This brand doesn&apos;t have products yet..
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

/* Helper Component */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="flex justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
      <span className="font-semibold text-gray-800 dark:text-gray-200">
        {label}:
      </span>
      <span className="text-gray-600 dark:text-gray-300 text-sm">
        {value}
      </span>
    </p>
  )
} 