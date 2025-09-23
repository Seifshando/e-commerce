"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import getMyToken from "../getMyToken/getMyToken";

interface CustomUser {
name?: string | null;
email?: string | null;
role?: string;
token?: string;
}

export default function DebugPage() {
const { data: session, status } = useSession();

async function gettheToken() {
const token = await getMyToken();
if (!token) throw new Error("Login First.");
}

useEffect(() => {
gettheToken();
}, []);

if (status === "loading") {
return <h1 className="text-center mt-10">Loading session...</h1>;
}

const customUser = session?.user as CustomUser | undefined;

return (
<div className="max-w-xl mx-auto my-10 p-6 border rounded-lg shadow-lg bg-white">
    <h1 className="text-2xl font-bold mb-4 text-emerald-600">🔎 Debug Session</h1>

    {session ? (
    <div>
        <p>
        <strong>Name:</strong> {customUser?.name}
        </p>
        <p>
        <strong>Email:</strong> {customUser?.email}
        </p>
        <p>
        <strong>Role:</strong> {customUser?.role}
        </p>
        <p className="truncate">
        <strong>Token:</strong>{" "}
        <span className="text-gray-600">{customUser?.token}</span>
        </p>
        <p>
        <strong>Expires:</strong> {session.expires}
        </p>
    </div>
    ) : (
    <p className="text-red-500">🚨 No active session (Not logged in)</p>
    )}
</div>
);
}
