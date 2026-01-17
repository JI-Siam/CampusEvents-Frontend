"use client";
import HeaderName from "@/components/ui/Name";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Registration() {
  const router = useRouter();

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const payload = {
      ...data,
      semester: Number(data.semester),
    };

    try {
      console.log("Sending data:", payload);
      const response = await axios.post(
        "http://localhost:3000/student/signup",
        payload
      );

      if (response.status === 201 || response.status === 200) {
        alert("Success!");
        router.push("/login");
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
      <HeaderName />
      <div className="flex min-h-screen items-center justify-center bg-base-300 p-6">
        <div className="card bg-base-100 w-full max-w-2xl shadow-2xl">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold justify-center mb-4">
              Registration
            </h2>

            <form
              onSubmit={handleRegistration}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Full Name</legend>
                <input
                  name="name"
                  type="text"
                  className="input input-bordered w-full"
                  required
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">AIUB Email</legend>
                <input
                  name="email"
                  type="email"
                  className="input input-bordered w-full"
                  required
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Student ID</legend>
                <input
                  name="studentId"
                  type="text"
                  className="input input-bordered w-full"
                  required
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Phone</legend>
                <input
                  name="phoneNumber"
                  type="tel"
                  className="input input-bordered w-full"
                  required
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <select
                  name="gender"
                  className="select select-bordered w-full"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Department</legend>
                <select
                  name="department"
                  className="select select-bordered w-full"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="CSE">CSE</option>
                  <option value="EEE">EEE</option>
                </select>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Semester</legend>
                <input
                  name="semester"
                  type="number"
                  className="input input-bordered w-full"
                  defaultValue="1"
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input
                  name="password"
                  type="password"
                  className="input input-bordered w-full"
                  required
                />
              </fieldset>

              <div className="md:col-span-2 mt-4">
                <button type="submit" className="btn btn-neutral w-full">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
