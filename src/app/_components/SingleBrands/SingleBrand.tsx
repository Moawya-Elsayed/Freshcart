
import Link from "next/link"
import Image from "next/image"
import { Brand } from "@/types/brand.type";

interface SingleBrandProps {
  brand: Brand;
}

export default function SingleBrand({ brand } : SingleBrandProps){

    return (
        <Link href={`/brands/${brand._id}`}>
            <div className="cursor-pointer group text-center text-gray-800 dark:text-gray-200">

                <Image
                    src={brand.image || "/placeholder.png"}
                    width={300}
                    height={300}
                    alt={brand.name  || "brand image"}
                    className="rounded-lg transition-transform duration-300 group-hover:scale-105 mx-auto"
                />

                <h3 className="mt-3 text-blue-600 dark:text-blue-600 font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-600">
                    {brand.name}
                </h3>

            </div>
        </Link>
    )
}