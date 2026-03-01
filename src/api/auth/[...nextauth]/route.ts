/* eslint-disable */

import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            "https://ecommerce.routemisr.com/api/v1/auth/signin",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials?.username,
                password: credentials?.password,
              }),
            }
          );

          const user = await res.json();

          if (res.ok && user.token) {
            return user;
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.token = user.token; 
    }
    return token;
  },

  async session({ session, token }) {
    return session;
  },
},
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// import NextAuth, { User } from "next-auth"; import { JWT } from "next-auth/jwt"; declare module "next-auth" { interface User { user: { name: string; email: string; role: string; }; token: string; } interface Session { user: { name: string; email: string; role: string; }; } } declare module "next-auth/jwt" { interface JWT extends User { idToken?: string; }