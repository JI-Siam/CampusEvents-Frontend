"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProtectedRoute from "@/components/ProtectRoutes";
import EventDetailCard from "@/components/ui/EventDetailsCard";
import EventActions from "@/components/ui/ActionButtons";
import Navbar from "@/components/ui/Navbar";

export default function JoinedEvents() {
  const [joinedEvents, setJoinedEvents] = useState<any[]>([]);
  const [studentId, setStudentId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedStudentId = localStorage.getItem("studentId");

    if (!token || !storedStudentId) {
      router.push("/login");
      return;
    }

    setStudentId(storedStudentId);

    async function fetchJoinedEvents() {
      try {
        const response = await axios.get(
          `http://localhost:3000/student/events/joining`,
          {
            params: { studentId: storedStudentId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setJoinedEvents(response.data || []);
      } catch (error: any) {
        console.error("Error fetching joined events:", error);
      }
    }

    fetchJoinedEvents();
  }, [router]);

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          My Joined Events
        </h1>

        {joinedEvents.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-xl">No joined events yet</p>
            <p className="mt-2">Join events to see them here!</p>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {joinedEvents.map((event: any) => (
              <div key={event.eventId} className="space-y-4">
                <EventDetailCard event={event} />
                {studentId && (
                  <EventActions eventId={event.eventId} studentId={studentId} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
