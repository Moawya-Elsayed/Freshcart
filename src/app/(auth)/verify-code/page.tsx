import { Suspense } from "react"
import VerifyCodeForm from "./VerifyCodeForm"

export default function VerifyCodePage() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
      <VerifyCodeForm />
    </Suspense>
  )
}