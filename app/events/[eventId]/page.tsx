"use client";
import { useEffect, useState, use } from "react";
import axios from "axios";
import EventDetailCard from "@/components/ui/EventDetailsCard";
import EventActions from "@/components/ui/ActionButtons";
import ProtectedRoute from "@/components/ProtectRoutes";
import Navbar from "@/components/ui/Navbar";
import { notFound } from "next/navigation";

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvent() {
      const token = localStorage.getItem("token");
      const storedStudentId = localStorage.getItem("studentId");
      setStudentId(storedStudentId);

      try {
        const response = await axios.get(
          `http://localhost:3000/student/event/details/${eventId}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return null;
  }

  if (!event) {
    notFound();
  }

  return (
    <ProtectedRoute>
      <Navbar></Navbar>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <EventDetailCard event={event} />
          <EventActions eventId={event.eventId} studentId={studentId} />
        </div>
      </div>
    </ProtectedRoute>
  );
}
