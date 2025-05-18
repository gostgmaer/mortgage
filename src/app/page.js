 "use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function Home(req) {
  const router = useRouter();
  useEffect(() => {
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
  }, [router]);

  return (
    <div>
      <h1>Public Home Page</h1>
      <a href="/dashboard">Go to Protected Page</a>
    </div>
  );
}
