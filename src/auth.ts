import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const user = await res.json();

        if (res.ok && user.token) {
          return {
            user: {
              name: user.user.name,
              email: user.user.email,
              role: user.user.role,
            },
            token: user.token, // token برا
          };
        }

        return null;
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user?.token) {
        token.accessToken = user.token; // خزناه في jwt
      }
      return token;
    },
    async session({ session, token }) {
      // user = name/email/role بس
      session.user = session.user || {
        name: "",
        email: "",
        role: "",
      };

      // حطينا الـ token برا
      (session as any).token = token.accessToken as string;

      return session;
    },
  },
};
