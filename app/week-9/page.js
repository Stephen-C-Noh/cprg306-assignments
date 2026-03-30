"use client";

// Import the useUserAuth hook
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function Page() {
// Use the useUserAuth hook to get the user object and the login and logout functions
  const { user, gitHubSignIn, googleSignIn, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/week-9/shopping-list");
    }
  }, [user, router]);

// Sign in to Firebase with GitHub authentication
async function handleSignIn() {
  try {
    await gitHubSignIn();
    sessionStorage.setItem("justLoggedIn", "true");
  } catch (error) {
    console.error("GitHub sign-in failed:", error);
  }
}

// Sign in to Firebase with Google authentication
async function handleGoogleSignIn() {
  try {
    await googleSignIn();
    sessionStorage.setItem("justLoggedIn", "true");
  } catch (error) {
    console.error("Google sign-in failed:", error);
  }
}

// Sign out of Firebase
async function handleSignOut() {
  try {
    await firebaseSignOut();
  } catch (error) {
    console.error("Sign-out failed:", error);
  }
}

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shopping List</h1>
      
      {!user ? (
        <div className="flex flex-col gap-3 w-72">
          <button
            onClick={handleSignIn}
            className="w-full bg-slate-900 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Sign In with GitHub
          </button>
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-300 shadow-sm transition-colors"
          >
            Sign In with Google
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-4 text-gray-600">
            Welcome, {user.displayName} ({user.email})
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleSignOut}
              className="border border-red-300 text-red-600 hover:bg-red-50 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Sign Out
            </button>
            <Link
              href="/week-9/shopping-list"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Go to Shopping List
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
 
