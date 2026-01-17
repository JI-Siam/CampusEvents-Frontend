import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="mb-4">Event not found</p>
        <Link href="/demoHome" className="text-blue-600 underline">
          <button className="btn btn-primary">Go back home</button>
        </Link>
      </div>
    </div>
  );
}
