import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";


const Titlebtn = ({ label = "Add", url = "/" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(url)}
      className="bg-[#001719] flex justify-center items-center gap-1.5 rounded-md w-fit px-3 tiny-normal:px-0  tiny-normal:w-[125px] h-[36px] py-2.5 cursor-pointer"
    >
            <h2 className="text-white text-xs tiny-normal:text-sm">{label}</h2>

      <span className="font-medium text-white">
        <FaPlus/>
      </span>
    </button>
  );
};

export default Titlebtn;