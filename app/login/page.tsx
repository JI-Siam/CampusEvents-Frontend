"use client";
import HeaderName from "@/components/ui/Name";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const payload = {
      ...data,
    };

    try {
      console.log("Sending data:", payload);
      const response = await axios.post(
        "http://localhost:3000/student/login",
        payload
      );

      if (response.status === 201 || response.status === 200) {
        alert("Success!");
        console.log(response.data);
        const token = response.data;
        console.log(token.token);
        localStorage.setItem("token", token.token);
        localStorage.setItem("studentId", response.data.student.studentId);

        router.push("/demoHome");
      }
    } catch (error: any) {
      const messages = error.response?.data?.message;
      console.log("Backend Validation Error:", messages);

      if (Array.isArray(messages)) {
        alert(`Validation Error: ${messages[0]}`);
      } else {
        alert(messages || "An unknown error occurred");
      }
    }
  };
  return (
    <>
      <HeaderName></HeaderName>
      <div className="flex min-h-screen items-center justify-center bg-base-300">
        <form onSubmit={handleLogin}>
          <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-xs border p-4 shadow-sm">
            <legend className="fieldset-legend text-lg font-bold">Login</legend>
            <label className="fieldset-label">Email</label>
            <input
              name="email"
              type="email"
              className="input input-bordered w-full"
              placeholder="Email"
              required
            />

            <label className="fieldset-label">Password</label>
            <input
              name="password"
              type="password"
              className="input input-bordered w-full"
              placeholder="Password"
              required
            />

            <button type="submit" className="btn btn-neutral mt-4 w-full">
              Login
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}
