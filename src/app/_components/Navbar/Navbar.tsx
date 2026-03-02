"use client"

  import Link from "next/link"
  import { useContext, useEffect, useState , useRef } from "react"
  import { usePathname } from "next/navigation"
  import {FaCartPlus,FaFacebook,FaInstagram,FaLinkedin,FaTiktok,FaTwitter,FaYoutube,FaSignOutAlt,FaHeart,FaMoon,FaSun , FaUserCircle  , FaBoxOpen , FaChevronDown, FaShieldAlt} from "react-icons/fa"
  import { HiMenu, HiX } from "react-icons/hi"
  import { useSession, signOut } from "next-auth/react"
  import { CartContext } from "@/context/CartContext"
  import { useTheme } from "next-themes"
import Image from "next/image"

  export default function Navbar() {

    const { data: session, status } = useSession()
    const { theme, setTheme } = useTheme()
    const pathname = usePathname()

    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    const { numberOfItems } = useContext(CartContext)!

    const [userMenuOpen, setUserMenuOpen] = useState(false)

    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      function flag(){
        setMounted(true)
      }
      flag()
    }, [])

    useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

    if (!mounted || status === "loading") return null

    const links = [
      { name: "Home", href: "/" },
      { name: "Products", href: "/products" },
      { name: "Categories", href: "/categories" },
      { name: "Brands", href: "/brands" } , 

    ]

    const socialLinks = [
      { icon: FaInstagram, href: "https://www.instagram.com", colorClass: "hover:text-[#E1306C]" },
      { icon: FaFacebook, href: "https://www.facebook.com", colorClass: "hover:text-[#1877F2]" },
      { icon: FaTiktok, href: "https://www.tiktok.com", colorClass: "hover:text-[#000000]" },
      { icon: FaTwitter, href: "https://twitter.com", colorClass: "hover:text-[#1DA1F2]" },
      { icon: FaLinkedin, href: "https://www.linkedin.com", colorClass: "hover:text-[#0A66C2]" },
      { icon: FaYoutube, href: "https://www.youtube.com", colorClass: "hover:text-[#FF0000]" },
    ]

    const handleLogout = () => {
      signOut({ 
        callbackUrl: "/login" ,
        redirect: true 
      })
    }

    return (
      <>
        <nav className="fixed top-0 left-0 z-50 w-full  bg-emerald-600 dark:bg-[#0f172a] text-white shadow-lg backdrop-blur-md border-b dark:border-gray-800 transition-all duration-300">
          <div className="container mx-auto px-4 lg:px-2 xl:px-0 lg:w-[92%] xl:w-[80%] flex items-center justify-between py-3">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 text-xl lg:text-2xl font-bold cursor-default hover:cursor-default transition duration-300">
              {/* <FaCartPlus className="shrink-0" /> */}
              <Image
                  src="/logo.png"
                  alt="Fresh Cart Logo"
                  width={120}
                  height={120}
                  className="w-12 h-12 rounded-full object-cover"
                />
              <span>Fresh Cart</span>
            </Link>

            {/* Desktop Links */}
            <ul className="hidden lg:flex gap-6 items-center">
              {links.map(link => {
                const isActive = pathname === link.href

                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`relative transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-white after:transition-all after:duration-300 ${
                        isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                      } hover:text-gray-200`}
                    >
                      {link.name}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Desktop Right */}
            <ul className="hidden lg:flex gap-5 items-center">

              {session && (
                <>
                  <Link href="/wishlist" className="text-xl hover:text-red-400 transition">
                    <FaHeart />
                  </Link>

                  <Link href="/cart" className="relative text-xl hover:text-yellow-400 transition">
                    <FaCartPlus />
                    {numberOfItems > 0 && (
                      <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {numberOfItems}
                      </span>
                    )}
                  </Link>


                </>
              )}

              {!session && (
                <>
                  {socialLinks.map(({ icon: Icon, href, colorClass }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`transition-transform hover:scale-125 ${colorClass}`}
                    >
                      <Icon />
                    </a>
                  ))}

                  <Link href="/login" className="px-2 py-1 hover:text-gray-200 transition">
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="bg-white text-emerald-600 px-4 py-1.5 rounded-lg font-semibold hover:shadow-lg transition"
                  >
                    Register
                  </Link>
                </>
              )}

              {session && (
                <div className="relative" ref={menuRef}>

                  {/* Trigger */}
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl
                    bg-white/10 hover:bg-white/20 transition
                    backdrop-blur-md border border-white/10"
                  >

                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-emerald-500
                    flex items-center justify-center text-white font-semibold uppercase">
                      {session.user?.name?.charAt(0)}
                    </div>

                    {/* Name */}
                    <div className="hidden md:flex flex-col text-left leading-tight">
                      <span className="text-sm font-semibold">
                        {session.user?.name}
                      </span>
                      <span className="text-xs text-gray-200 dark:text-gray-400">
                        Account
                      </span>
                    </div>

                    <FaChevronDown
                      className={`transition-transform duration-300 ${
                        userMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`absolute right-0 mt-3 w-64 z-50 bg-white text-gray-800 dark:bg-[#111827] dark:text-white]
                    border border-gray-200 dark:border-gray-800
                    rounded-2xl shadow-2xl overflow-hidden
                    transform transition-all duration-300 origin-top
                    ${
                      userMenuOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
                  >

                    {/* Header */}
                    <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0f172a]">
                      <p className="font-semibold text-gray-800 dark:text-white truncate">
                        {session.user?.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {session.user?.email}
                      </p>
                    </div>

                    {/* Links */}
                    <div className="p-2 text-sm">

                      <Link
                        href="/profile/addresses"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg
                        hover:bg-emerald-100 dark:hover:bg-gray-800 transition dark:text-white"
                      >
                        <FaUserCircle className="text-emerald-500" />
                        My Profile
                      </Link>

                      <Link
                        href="/allorders"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg
                        hover:bg-emerald-100 dark:hover:bg-gray-800 transition dark:text-white"
                      >
                        <FaBoxOpen className="text-yellow-500" />
                        My Orders
                      </Link>

                      <Link
                        href="/profile/security"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg
                        hover:bg-emerald-100 dark:hover:bg-gray-800 transition dark:text-white"
                      >
                        <FaShieldAlt className="text-indigo-500" />
                        Security
                      </Link>

                      <div className="my-2 border-t border-gray-200 dark:border-gray-800" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2
                        rounded-lg text-red-500
                        hover:bg-red-100 dark:hover:bg-red-900/30 transition"
                      >
                        <FaSignOutAlt />
                        Sign Out
                      </button>

                    </div>
                  </div>
                </div>
              )}

                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="relative w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition"
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all duration-300 flex items-center justify-center ${
                      theme === "dark" ? "translate-x-6" : "translate-x-0"
                    }`}>
                      {theme === "dark" ? (
                        <FaSun size={10} className="text-yellow-500" />
                      ) : (
                        <FaMoon size={10} className="text-gray-600" />
                      )}
                    </div>
                </button>

            </ul>

            {/* Mobile Menu Button */}
            <button onClick={() => setOpen(true)} className="lg:hidden text-3xl">
              <HiMenu />
            </button>

          </div>
        </nav>

        {/* Overlay */}
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 bg-black/40 z-40 transition ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        />

        {/* Side Drawer */}
        <div
          className={`fixed top-0 right-0 h-screen w-72 overflow-y-auto bg-white dark:bg-[#0f172a] text-gray-800 dark:text-white z-50 shadow-2xl border-l dark:border-gray-800 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >

          <div className="flex justify-between items-center p-5 border-b dark:border-gray-800">
            <span className="font-bold">Menu</span>
            <button onClick={() => setOpen(false)}>
              <HiX size={28} />
            </button>
          </div>

          <ul className="flex flex-col gap-4 p-5">

            {session && (
              <>
                <Link href="/wishlist" onClick={() => setOpen(false)}>
                  <li className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-gray-800 hover:text-emerald-600">
                    <FaHeart />
                    Wishlist
                  </li>
                </Link>

                <Link href="/cart" onClick={() => setOpen(false)}>
                  <li className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-gray-800 hover:text-emerald-600">
                    <div className="flex items-center gap-2">
                      <FaCartPlus />
                      <span>Cart</span>
                    </div>

                    {numberOfItems > 0 && (
                      <span className="bg-red-500 text-white text-xs min-w-5 h-5 px-1 flex items-center justify-center rounded-full">
                        {numberOfItems}
                      </span>
                    )}
                  </li>
                </Link>
              </>
            )}

            {links.map(link => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-gray-800 hover:text-emerald-600 transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}

          </ul>

          {/* Footer Mobile Drawer */}
          <div className="mt-auto p-5 border-t dark:border-gray-800">

            {/* Theme Toggle */}
            <div className="flex justify-between items-center mb-5">
              <span className="text-sm font-medium">Theme</span>

              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-14 h-7 flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition"
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-300 ${
                    theme === "dark" ? "translate-x-7" : "translate-x-0"
                  }`}
                >
                  {theme === "dark" ? (
                    <FaSun size={12} className="text-yellow-500" />
                  ) : (
                    <FaMoon size={12} className="text-gray-600" />
                  )}
                </div>
              </button>
            </div>

            {/* User Card */}
            {session && (
              <div className="bg-emerald-50 dark:bg-gray-800/60 rounded-xl p-4 text-center mb-4 shadow-sm">
                <p className="text-sm font-semibold truncate mb-3">
                  Hello, {session.user?.name}
                </p>


               <div className="flex flex-col gap-2 mb-4">

                <Link
                  href="/profile/addresses"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg
                  hover:bg-emerald-100 dark:hover:bg-gray-700
                  transition"
                >
                  <FaUserCircle className="text-emerald-500" />
                  <span>My Profile</span>
                </Link>

                <Link
                  href="/allorders"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg
                  hover:bg-emerald-100 dark:hover:bg-gray-700
                  transition"
                >
                  <FaBoxOpen className="text-yellow-500" />
                  <span>My Orders</span>
                </Link>

                <Link
                  href="/profile/security"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg
                  hover:bg-emerald-100 dark:hover:bg-gray-700
                  transition"
                >
                  <FaShieldAlt className="text-indigo-500" />
                  <span>Security</span>
                </Link>

              </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
                >
                  <FaSignOutAlt />
                  Sign Out
                </button>
              </div>
            )}
          </div>

        </div>
      </>
    )
  }