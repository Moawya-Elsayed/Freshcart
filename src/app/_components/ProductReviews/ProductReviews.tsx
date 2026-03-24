"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { FaStar } from "react-icons/fa"

import { getProductReviews } from "@/api/getProductReviews"
import { createReview } from "@/ReviewActions/createReview.action"
import { updateReview } from "@/ReviewActions/updateReview.action"
import { deleteReview } from "@/ReviewActions/deleteReview.action"
import { Review, ReviewsResponse } from "@/types/review.type"
import { useCallback } from "react"

export default function ProductReviews({ productId }: { productId: string }) {

  const { data: session } = useSession()
  const currentUserId = session?.user?.id

  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [reviewText, setReviewText] = useState("")
  const [rating, setRating] = useState(0)
  const [editingId, setEditingId] = useState<string | null>(null)


  const loadReviews = useCallback(async () => {
    try {
      setLoading(true)

      const res : ReviewsResponse  = await getProductReviews(productId)

  //     const sorted = [...res.data].sort(
  // (a, b) =>
  //   new Date(b.createdAt).getTime() -
  //   new Date(a.createdAt).getTime()
  // )  
      const reviewsData = Array.isArray(res?.data) ? res.data : [];

    const sorted = [...reviewsData].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )

      setReviews(sorted)

    } catch {
      toast.error("Failed to load reviews" , {
        duration:2000 , 
        position:"top-center"
      })
    } finally {
      setLoading(false)
    }
  } , [productId])

  useEffect(() => {
  loadReviews()
}, [loadReviews])

  const averageRating =
    reviews.length > 0
      ? (
          // reviews.reduce((acc, r) => acc + r.rating, 0) /
          reviews.reduce((acc, r) => acc + Number(r.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : "0.0"

  // ⭐ Submit Review
  async function handleSubmit() {

    if (!reviewText.trim() || rating === 0) {
      toast.error("Please write review and select rating", {
        duration:2000 , 
        position:"top-center"
      })
      return
    }

    try {
      setSubmitting(true)

      if (editingId) {

        await updateReview(editingId, {
          review: reviewText,
          rating
        })

        toast.success(" Review updated successfully", {
        duration:2000 , 
        position:"top-center"
      })

      } else {

        const newReview = await createReview(productId, {
          review: reviewText,
          rating
        })

        // Optimistic UI
        setReviews(prev => [newReview.data || newReview, ...prev])

        toast.success(" Your review has been added", {
        duration:2000 , 
        position:"top-center"
      })
      }

      setReviewText("")
      setRating(0)
      setEditingId(null)

      loadReviews()

    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong"

      toast.error(message, {
        duration:2000,
        position:"top-center"
      })
    }finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteReview(id)

      setReviews(prev => prev.filter(r => r._id !== id))

      toast.success("Review deleted", {
        duration:2000 , 
        position:"top-center"
      })

    } catch {
      toast.error("Cannot delete review now", {
        duration:2000 , 
        position:"top-center"
      })
    }
  }

  function startEdit(review: Review) {
    setEditingId(review._id)
    setReviewText(review.review)
    setRating(review.rating)

    document.getElementById("reviewForm")
      ?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="mt-16">

      <h2 className="text-2xl font-bold mb-4">
        Customer Reviews
      </h2>

      {/* Average */}
      {reviews.length > 0 && (
        <div className="flex gap-3 items-center mb-8">
          <span className="text-xl font-bold">{averageRating}</span>

          <div className="flex">
            {[...Array(Math.round(Number(averageRating)))].map((_, i) => (
              <FaStar key={i} className="text-yellow-500" />
            ))}
          </div>

          <span>({reviews.length})</span>
        </div>
      )}

      {/* Form */}
      {session && (
        <div id="reviewForm" className="p-6 border rounded-2xl mb-10">

          <textarea
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            placeholder="Write review..."
            className="w-full border p-3 rounded-xl mb-4"
          />

          <div className="flex gap-2 mb-4">
            {[1,2,3,4,5].map(num => (
              <FaStar
                key={num}
                onClick={() => setRating(num)}
                className={`cursor-pointer text-xl ${
                  rating >= num ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <button
            disabled={submitting}
            onClick={handleSubmit}
            className={`px-5 py-2 rounded-xl text-white transition ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {submitting
              ? editingId
                ? "Updating..."
                : "Submitting..."
              : editingId
              ? "Update Review "
              : "Submit Review"}
          </button>

        </div>
      )}

      {/* List */}
      {loading ? (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="sk-chase scale-125">
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                </div>
            </div>
      ) : reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map(review => {



          const isOwner = review.user._id === currentUserId

          return (
            <div key={review._id} className="border p-5 rounded-2xl mb-4">

              <div className="flex justify-between">
                <div>
                  <h4 className="font-semibold">
                    {review.user.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>

              <div className="flex">
                {[...Array(Math.floor(Number(review.rating) || 0))].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>



              </div>

              <p className="mt-3">{review.review}</p>

              {isOwner && (
                <div className="flex gap-4 mt-4 text-sm">

                  <button
                    onClick={() => startEdit(review)}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(review._id)}
                    className="cursor-pointer text-red-600 hover:underline"
                  >
                    Delete
                  </button>


                </div>
              )}

            </div>
          )
        })
      )}

    </div>
  )
}