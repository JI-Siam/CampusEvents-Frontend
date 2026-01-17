"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProtectedRoute from "@/components/ProtectRoutes";
import EventDetailCard from "@/components/ui/EventDetailsCard";
import EventActions from "@/components/ui/ActionButtons";
import Navbar from "@/components/ui/Navbar";

export default function SavedEvents() {
  const [savedEvents, setSavedEvents] = useState<any[]>([]);
  const router = useRouter();
  const token = localStorage.getItem("token");
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    async function fetchSavedEvents() {
      if (!token || !studentId) {
        router.push("/login");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/student/events/saved`,
          {
            params: { studentId: studentId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Extract events from savedEvents array
        const events = response.data.savedEvents || [];
        setSavedEvents(events);
      } catch (error: any) {
        console.error("Error fetching saved events:", error);
      }
    }

    fetchSavedEvents();
  }, [router]);

  return (
    <ProtectedRoute>
      <Navbar></Navbar>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">My Saved Events</h1>

        {savedEvents.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-xl">No saved events yet</p>
            <p className="mt-2">
              Start exploring and save events you're interested in!
            </p>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {savedEvents.map((savedEvent: any) => (
              <div key={savedEvent.savedId} className="space-y-4">
                <EventDetailCard event={savedEvent.event} />
                <EventActions
                  eventId={savedEvent.event.eventId}
                  studentId={studentId}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
