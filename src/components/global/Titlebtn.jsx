import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const Titlebtn = ({ label = "Add", url = "/",  width = " w-fit px-3 tiny-normal:px-0 tiny-normal:w-[125px]"   }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(url)}
      className={`
        bg-[#001719]
        flex justify-center items-center gap-1.5
        rounded-md ${width}
        h-[36px] py-2.5 cursor-pointer

        transition-all duration-300 ease-in-out
        hover:bg-[#003336]
        hover:shadow-md
        active:scale-95
        focus:outline-none focus:ring-2 focus:ring-[#003336]/40
      `}
    >
      <h2 className="text-white text-xs tiny-normal:text-sm transition-colors duration-300">
        {label}
      </h2>

      <span className="font-medium text-white transition-transform duration-300 group-hover:translate-x-0.5">
        <FaPlus />
      </span>
    </button>
  );
};

export default Titlebtn;
  