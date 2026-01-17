export default function DashBoard() {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  return (
    <>
      This is a dummy DashBoard of {email} , {token}
    </>
  );
}
