"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div
      className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-6 
      bg-gray-50 dark:bg-[#020617] 
      text-gray-800 dark:text-gray-200 
      p-6 rounded-xl shadow-md"
    >
      <h1 className="text-6xl font-extrabold text-emerald-600">404</h1>

      <h2 className="text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="text-gray-600 dark:text-gray-400 max-w-md">
        The page you’re looking for doesn’t exist or may have been moved.
        Please check the URL or return to the homepage.
      </p>

      <div className="flex gap-4">
        <Link href="/">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            Go Home
          </Button>
        </Link>

        <Button
          variant="outline"
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
} 