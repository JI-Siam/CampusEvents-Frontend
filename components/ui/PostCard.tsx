"use client";
import { useRouter } from "next/navigation";

export default function PostCard({
  eventId,
  title,
  description,
  date,
  location,
}: any) {
  const router = useRouter();

  function handleView() {
    router.push(`/events/${eventId}`);
  }

  return (
    <div className="flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-12 items-center gap-10  border border-gray-200 rounded-lg ">
      <h2 className="font-extrabold text-2xl font-serif text-green-950 text-center">
        {title}
      </h2>
      <h3 className="text-gray-700 text-lg">{description}</h3>

      <h4 className="text-gray-700">Date: {date}</h4>
      <h4 className="text-gray-700">Location: {location}</h4>
      <button
        onClick={handleView}
        className="bg-black px-6 py-3 rounded-lg text-white hover:bg-gray-500 hover:cursor-pointer"
      >
        View
      </button>
    </div>
  );
}
