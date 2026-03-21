"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useUserAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      router.push("/week-9");
    }
  }, [user]);

  if (!user) return null;

  return (
    <main className="p-4 max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        <button
          onClick={() => firebaseSignOut()}
          className="border border-red-300 text-red-600 hover:bg-red-50 font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Sign Out
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center gap-4">
        {user.photoURL && (
          <Image
            src={user.photoURL}
            alt="Profile photo"
            width={96}
            height={96}
            className="rounded-full"
          />
        )}
        <div className="text-center">
          <p className="text-xl font-semibold">{user.displayName}</p>
          <p className="text-gray-500">{user.email}</p>
        </div>

        <div className="w-full border-t pt-4 text-sm text-gray-600 space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">User ID</span>
            <span className="truncate max-w-[60%] text-right">{user.uid}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Provider</span>
            <span>{user.providerData[0]?.providerId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email verified</span>
            <span>{user.emailVerified ? "Yes" : "No"}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <Link
          href="/week-9/shopping-list"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Shopping List
        </Link>
        <Link
          href="/week-9"
          className="border border-slate-300 text-slate-600 hover:bg-slate-50 font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Home
        </Link>
      </div>
    </main>
  );
}
