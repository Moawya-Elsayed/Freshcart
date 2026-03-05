      import { NextAuthOptions } from "next-auth"
      import Credentials from "next-auth/providers/credentials"
      import {jwtDecode} from "jwt-decode"

      type AuthUserType = {
        id: string;
        name: string;
        email: string;
        role: string;
        phone?: string;
        };

      export const authOptions: NextAuthOptions = {
        pages: {
          signIn: "/login",
        },
        providers: [
          Credentials({
            name: "Credentials",
            credentials: {
              email: { label: "Email", type: "text" },
              password: { label: "Password", type: "password" },
            },

            
            authorize: async (credentials) => {
              const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signin`, {
                method: "POST",
                body: JSON.stringify({
                  email: credentials?.email,
                  password: credentials?.password,
                }),
                headers: { "Content-Type": "application/json" },
              });

              const payload = await response.json();
              if (payload.message === "success") {
                const decode: { id: string } = jwtDecode(payload.token);
                return {
                  id: decode.id,
                  user: payload.user,
                  token: payload.token,
                };
              } else {
                throw new Error("invalid email or password");
              }
            },
          }),
        ],

        callbacks: {
          // async jwt({ token, user }) {
          //   if (user) {
          //     token.user = user.user ;
          //     token.token = user.token;
          //     token.id = user.id;   
          //   }
          //   return token;
          // }  , 

          async jwt({ token, user, trigger, session }) {

  // أول تسجيل دخول
  if (user) {
    token.user = {
      ...user.user,
    };
    token.token = user.token;
    token.id = user.id;
  }

  // لما نعمل session.update()
  if (trigger === "update" && session?.user) {
    token.user = {
      ...token.user,
      ...session.user,
    };
  }

  return token;
} , 
          async session({ session, token }) {
            session.user = token.user as AuthUserType;
            session.user.id = token.id as string;
            session.token = token.token as string;

            return session;
          } ,
        },

        cookies: {
          sessionToken: {
            name: `next-auth.session-token`,
            options: {
              httpOnly: true,
              sameSite: "lax",
              path: "/",
              secure: process.env.NODE_ENV === "production",
            },
          },
        },
      };
