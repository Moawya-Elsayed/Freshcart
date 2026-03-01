import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from './_components/Navbar/Navbar';
import Footer from "./_components/Footer/Footer" ;
import { Toaster } from "@/components/ui/sonner"
import MySessionProvider  from "../MySessionProvider/MySessionProvider"
import { CartContextProvider } from "@/context/CartContext";
import { ThemeProvider } from "next-themes";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
const interSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Fresh Cart",
    template: "%s | Fresh Cart"
  },
  description: "Ecommerce Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" >
      <body
        className={`${interSans.variable} ${robotoMono.variable} antialiased  min-h-screen flex flex-col pt-20` }
        suppressHydrationWarning >
        
        <ThemeProvider  attribute="class" defaultTheme="light" enableSystem>
          
          <MySessionProvider>
          <CartContextProvider>
            <Navbar/>
            {/* {children} */}
            <main className="flex-1">
                {children}
              </main>
            <Footer/>
            <Toaster/>  
          </CartContextProvider>
        </MySessionProvider>

        </ThemeProvider>
        
          
        
      </body>
    </html>
  );
}
