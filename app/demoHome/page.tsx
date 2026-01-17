import ProtectedRoute from "@/components/ProtectRoutes";
import Navbar from "@/components/ui/Navbar";
import PostCard from "@/components/ui/PostCard";
import PostContainer from "@/components/ui/PostContainer";

export default function DemoHome() {
  return (
    <>
      <ProtectedRoute>
        <Navbar />
        <PostContainer />
      </ProtectedRoute>
    </>
  );
}
