import PostCard from "./PostCard";
import axios from "axios";
async function getPosts() {
  const response = await axios.get("http://localhost:3000/student/events");
  return response.data;
}
export default async function PostContainer() {
  const posts = await getPosts();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-10 sm:m-20 md:m-30 gap-5">
        {posts.map((post: any) => (
          <PostCard
            key={post.eventId}
            eventId={post.eventId}
            title={post.eventTitle}
            description={post.eventDescription}
            date={post.eventDate}
            location={post.eventLocation}
          />
        ))}
      </div>
    </>
  );
}
