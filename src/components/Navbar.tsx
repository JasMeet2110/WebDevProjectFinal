"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl">Tech Haven</Link>
      <div className="flex items-center gap-4">
        <Link href="/shop" className="hover:underline">Shop</Link>

        {status === "unauthenticated" && (
          <>
            <Link href="/signup" className="hover:underline">Sign Up</Link>
            <Link href="/login" className="hover:underline">Sign In</Link>
          </>
        )}

        {status === "authenticated" && session?.user?.role === "admin" && (
          <Link href="/admin" className="hover:underline">Admin</Link>
        )}

        {status === "authenticated" && (
          <>
            <span className="text-sm hidden md:inline">
              Hi, {session.user?.email}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
