"use client";
// pages/403.tsx
import Link from "next/link";
import { ShieldOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
export default function UnauthorizedPage() {
  const router = useRouter();

  const navigateEvent = (params) => {
    try {
      const userCookies = JSON.parse(Cookies.get("user")) || [];

      if (userCookies.role.includes("Super-Admin")) {
        router.push("/admin");
      } else if (userCookies.role.includes("Client")) {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Invalid token:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <ShieldOff className="w-10 h-10 text-red-500" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">403</h1>
        <p className="text-xl font-semibold text-gray-700 mb-2">
          Unauthorized Access
        </p>
        <p className="text-gray-600 mb-6">
          Sorry, you don&apos;t have permission to view this page.
        </p>
        <button
     onClick={navigateEvent}
          className="inline-block pointer bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
