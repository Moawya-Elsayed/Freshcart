import { getReviewById } from "@/api/getReviewById"

export default async function ReviewDetails({
  params
}: {
  params: { id: string }
}) {

  const reviewId = params?.id?.toString()

  if (!reviewId) {
    return <div className="p-20 text-center">Invalid Review</div>
  }

  const review = await getReviewById(reviewId)

  // if (!review?.data) {
  if (!review || !review.data) {
    return <div className="p-20 text-center">Review not found</div>
  }

  const data = review.data

  return (
    <div className="max-w-2xl mx-auto p-10">

      <h1 className="text-2xl font-bold mb-6">
        Review Details
      </h1>

      <div className="border p-6 rounded-2xl">

        <h2 className="font-semibold">
          {data.user?.name}
        </h2>

        <p className="text-gray-500 text-sm">
          {new Date(data.createdAt).toLocaleDateString()}
        </p>

        <p className="mt-4">
          {data.review}
        </p>

        <p className="font-bold mt-4">
          Rating: {data.rating} ⭐
        </p>

      </div>

    </div>
  )
}