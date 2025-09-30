import { FaPlus } from "react-icons/fa";

export default function AddButton() {
  return (
    <button
      className="
        flex items-center justify-center
        w-14 h-14 rounded-full
        bg-blue-600 text-white text-2xl
        shadow-lg
        transform transition-all duration-300
        hover:rotate-90 hover:scale-110 hover:bg-blue-700
        active:scale-90
      "
    >
      <FaPlus />
    </button>
  );
}
