"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export default async function getMyToken(){
  const decodedToken =
  (await cookies()).get("next-auth.session-token")?.value ||
  (await cookies()).get("__Secure-next-auth.session-token")?.value;

  if(!decodedToken) return null;


  const token = await decode({token: decodedToken, secret: process.env.NEXTAUTH_SECRET!});



  return token?.token || null;
}






// نوع الكوكي الفردية
// interface CookieItem {
//   name: string;
//   value: string;
// }

// export default async function getMyToken(): Promise<string | null> {
//   try {
//     const cookieStore = cookies();

//     // getAll راجعة Array من CookieItem
//     const allCookies: CookieItem[] = (await cookieStore).getAll();

//     // دور على auth_token
//     const tokenCookie = allCookies.find(
//       (c: CookieItem) => c.name === "auth_token"
//     );

//     return tokenCookie?.value || null;
//   } catch (err) {
//     console.error("❌ Error getting token:", err);
//     return null;
//   }
// }
