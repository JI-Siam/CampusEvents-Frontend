"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("studentId");
    router.push("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-black px-6 py-3 rounded-lg text-white hover:bg-gray-500 hover:cursor-pointer"
    >
      Logout
    </button>
  );
}
