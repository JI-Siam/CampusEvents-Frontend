"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function EventActions({
  eventId,
  studentId,
}: {
  eventId: number;
  studentId: string | null;
}) {
  const [isSaved, setIsSaved] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token = localStorage.getItem("token");

  console.log("isSaved" + isSaved);
  console.log("alreadyJoined" + isJoined);

  // Fetch initial saved/joined status
  useEffect(() => {
    async function checkEventStatus() {
      if (!studentId || !token) {
        setLoading(false);
        return;
      }

      try {
        // Check if event is saved
        const savedResponse = await axios.get(
          `http://localhost:3000/student/event/checkSaved/${eventId}`,
          {
            params: { studentId: studentId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsSaved(savedResponse.data.isSaved || false);

        // Check if already joined
        const joinedResponse = await axios.get(
          `http://localhost:3000/student/event/checkJoined/${eventId}`,
          {
            params: { studentId: studentId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsJoined(joinedResponse.data.isJoined || false);
      } catch (error) {
        console.error("Error checking event status:", error);
      } finally {
        setLoading(false);
      }
    }

    checkEventStatus();
  }, [eventId, studentId, token]);

  console.log(isJoining);

  async function handleJoinNow() {
    if (isJoined) {
      alert("You have already joined this event!");
      return;
    }

    setIsJoining(true);
    try {
      await axios.post(
        `http://localhost:3000/student/events/markjoining/${eventId}`,
        {
          studentId: studentId,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      setIsJoined(true);
      alert("Successfully joined the event!");
    } catch (error) {
      console.error("Error joining event:", error);
      alert("Failed to join event");
    } finally {
      setIsJoining(false);
    }
  }

  async function handleSaveToggle() {
    setIsSaved(!isSaved);
    try {
      if (isSaved) {
        await axios.delete(
          `http://localhost:3000/student/events/saved/delete/${eventId}`,
          {
            data: { studentId: studentId },
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
      } else {
        await axios.post(
          `http://localhost:3000/student/events/save/${eventId}`,
          { studentId: studentId },
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
      }
    } catch (error) {
      console.error("Error saving event:", error);
      setIsSaved(!isSaved); // Revert on error
    }
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center mt-6">
      <button
        onClick={handleJoinNow}
        disabled={isJoining || isJoined || loading}
        className={`${
          isJoined
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 cursor-pointer"
        } text-white font-bold py-3 px-8 rounded-lg disabled:opacity-50`}
      >
        {isJoining ? "Joining..." : isJoined ? "Already Joined" : "Join Now"}
      </button>

      <button
        onClick={handleSaveToggle}
        disabled={loading}
        className={`${
          isSaved
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-gray-600 hover:bg-gray-700"
        } text-white font-bold py-3 px-8 rounded-lg cursor-pointer disabled:opacity-50`}
      >
        {loading ? "Loading..." : isSaved ? "Unsave" : "Save"}
      </button>
    </div>
  );
}
