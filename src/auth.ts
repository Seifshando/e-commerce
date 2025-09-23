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

  const data = await res.json();

  if (res.ok && data.token) {
    return {
      id: data.user._id, // لازم ترجع id أو أي unique identifier
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
      token: data.token, // ضفناه هنا عادي
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
      token.accessToken = user.token;
    }
    return token;
  },
  async session({ session, token }) {
    session.user = {
      name: session.user?.name || "",
      email: session.user?.email || "",
      role: session.user?.role || "",
    };

    session.token = token.accessToken; // دلوقتي متعرف في types

    return session;
  },
},

};
