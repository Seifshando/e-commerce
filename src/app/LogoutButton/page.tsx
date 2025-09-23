"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ redirect: false })
    toast.success("Logged out successfully ✅", { position: "top-center" })
  }

  return (
    <Button
      onClick={handleLogout}
      className="bg-red-500 text-white hover:bg-black hover:text-red-400 transition-all"
    >
      Logout
    </Button>
  )
}
