import NextAuth from "next-auth"
import { authOption } from "@/testauth"

const handler = NextAuth(authOption)

export { handler as GET, handler as POST }


