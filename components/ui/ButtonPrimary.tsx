export default function ButtonPrimary({ name }: any) {
  return (
    <button className="bg-black px-6 py-3 rounded-lg text-white hover:bg-gray-500 hover:cursor-pointer">
      {name}
    </button>
  );
}
