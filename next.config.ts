// import type { NextConfig } from "next";
// import { AuthOptions as NextAuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     remotePatterns: [new URL("https://ecommerce.routemisr.com/**/**")],
//   },
// };

// export default nextConfig;
// export let authOptions: NextAuthOptions = {
//   providers: [
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "jsmith" },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: () => {
//         // call api to validate credentials and return user object if valid
//         // const res = await fetch("http://localhost:3000/api/auth/login", {
//         //     method: "POST",
//         //     body: JSON.stringify({
//         //         username: credentials?.username,
//         //         password: credentials?.password
//         //     }),
//         //     headers: { "Content-Type": "application/json" }
//         // })
//         // const user = await res.json()
//         // if (user && user.token) {
//         //     return user
//         // }
//         // return null
//       },
//     })
//   ],
// };

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
      },
    ],
  },
};

export default nextConfig;
