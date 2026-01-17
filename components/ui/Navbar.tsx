"use client";
import { useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";
export default function Navbar() {
  const Router = useRouter();

  const navigateSavedEvents = () => {
    Router.push("/savedEvents");
  };

  const navigateToHome = () => {
    Router.push("/demoHome");
  };

  const navigateToJoinedEvents = () => {
    Router.push("/joinedEvents");
  };

  const navigateToProfile = () => {
    Router.push("/profile");
  };

  return (
    <div className="flex justify-around flex-wrap p-10 gap-5 items-center hover:cursor-pointer">
      <h1 onClick={navigateToHome} className="font-extrabold text-3xl">
        AIUB <span className="text-green-800 text-5xl font-serif">Campus</span>{" "}
        Events
      </h1>

      <ul className="flex gap-10 md:gap-20 justify-center items-center flex-wrap ">
        <li
          onClick={navigateToHome}
          className="hover:underline hover:cursor-pointer"
        >
          Home
        </li>
        <li className="hover:underline hover:cursor-pointer">Profile</li>
        <li
          onClick={navigateToJoinedEvents}
          className="hover:underline hover:cursor-pointer"
        >
          Joined Events
        </li>
        <li
          onClick={navigateSavedEvents}
          className="hover:underline hover:cursor-pointer"
        >
          Saved Events
        </li>
      </ul>
      <LogoutButton></LogoutButton>
    </div>
  );
}
