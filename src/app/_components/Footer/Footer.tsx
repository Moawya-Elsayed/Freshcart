        "use client";

        import { useState } from "react";
        import { FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";

        export default function Footer() {
        const [email, setEmail] = useState("");

        const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        };

        return (
        <footer className="bg-emerald-600 dark:bg-[#0f172a] text-white mt-14">

        {/* ===== TOP SECTION ===== */}
        <div className="max-w-6xl mx-auto px-6 py-8">

                <div className="space-y-4">

                {/* Text */}
                <div className="text-center lg:text-left">
                <h2 className="text-xl font-bold mb-1">
                Get the FreshCart App
                </h2>

                <p className="text-emerald-100 text-sm">
                We will send you a link, open it on your phone to download the app.
                </p>
                </div>

                {/* Input + Button */}
                <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 sm:ml-10 lg:ml-10"
                >

                <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-2
                                bg-white/80
                                text-black placeholder-black/70
                                outline-none
                                focus:ring-0
                                transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

               <button
                className="px-8 py-2
                        bg-black dark:bg-emerald-600
                        dark:text-black
                        hover:bg-gray-900 dark:hover:bg-emerald-500
                        transition
                        flex items-center justify-center
                        whitespace-nowrap"
                >
                Share App Link
                </button>

                </form>

                </div>
        </div>

        {/* ===== BOTTOM SECTION ===== */}
        <div className="border-t border-white/20">

                <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Payment */}
                <div className="flex items-center gap-4 text-2xl opacity-90 flex-wrap justify-center">
                <span className="text-sm text-emerald-100">
                Payment Partners
                </span>

                <FaCcVisa />
                <FaCcMastercard />
                <FaCcPaypal />
                </div>

                {/* Center + Right Group */}
                <div className="flex flex-col sm:flex-row items-center gap-6 text-center">

                {/* Copyright */}
                <div className="text-sm text-emerald-200">
                Get deliveries with FreshCart.
                </div>

                {/* App Buttons */}
                <div className="flex gap-2 flex-wrap justify-center">
               <button className="bg-black dark:bg-emerald-600 dark:text-black
                   px-4 py-1 text-sm
                   hover:bg-gray-900 dark:hover:bg-emerald-500
                   transition">
                App Store
                </button>

                <button className="bg-black dark:bg-emerald-600 dark:text-black
                                px-4 py-1 text-sm
                                hover:bg-gray-900 dark:hover:bg-emerald-500
                                transition">
                Google Play
                </button>
                </div>

                </div>

                </div>
        </div>

        </footer>
        );
        }