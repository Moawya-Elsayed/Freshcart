"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
interface ErrorProps {
  error: Error;
  reset: () => void;
}
export default function Error({ error, reset } : ErrorProps) {
  console.error(error);

  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    if (reset) {
      reset();
    } else {
      window.location.reload();
    }
  };

  return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-6 
      bg-gray-50 dark:bg-[#020617] 
      text-gray-800 dark:text-gray-200 
      p-6 rounded-xl shadow-md">
      <h1 className="text-4xl font-bold text-red-600 dark:text-red-600">Oops! Something went wrong</h1>
      <p className="text-gray-700 max-w-md">
        Sorry, we encountered an error while loading this page. You can try again or go back to the homepage.
      </p>

      {isRetrying ? (
        <div className="w-full max-w-sm mt-4 space-y-3">
          <div className="h-48 bg-gray-200 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-full bg-linear-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
          </div>
          <div className="h-5 w-2/3 bg-gray-200 rounded relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-full bg-linear-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
          </div>
          <div className="h-5 w-full bg-gray-200 rounded relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-full bg-linear-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
          </div>
          <div className="h-10 w-full bg-gray-200 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-full bg-linear-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
          </div>
        </div>
      ) : (
        <div className="flex gap-4">
          <Button onClick={handleRetry} className="bg-emerald-600 hover:bg-emerald-700">
            Retry
          </Button>
          <Link href="/">
            <Button variant="outline">Go Home</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
