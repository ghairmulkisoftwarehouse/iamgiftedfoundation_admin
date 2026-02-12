import { useRef, useState } from "react";
import useClickOutside from "../../../../utils/clickOutside";
import AngleArrowSvg from "../../../../assets/svgs/AngleArrowSvg";
import { RxCross2 } from "react-icons/rx";
import ClipLoader from "react-spinners/ClipLoader";
import Axios from "../../../../config/api";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { setStats,setMultipleCompanyDetails,removeCompanyDetail} from "../../../../redux/slices/companySlice";

const InputTags = ({
  label,
  name,
  value = [],
  onChange,
  error,
  readOnly = false,
}) => {
  const containerRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { docs } = useSelector((state) => state.company);

  useClickOutside(containerRef, () => setShowMenu(false));

  // Fetch companies
  const { isLoading, isError } = useQuery(
    ["fetch-all-company", searchTerm],
    async () => {
      let url = `/company?sortBy=createdAt_descending`;
      if (searchTerm) url += `&keyword=${encodeURIComponent(searchTerm)}`;
      return Axios.get(url);
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        const {
          data: {
            data: { docs, pages, docsCount, page },
          },
        } = res;
        dispatch(setStats({ docs, pages, docsCount, page }));
      },
    }
  );

  const isActive = focused || value.length > 0;

  const isSelected = (id) => value.some((tag) => tag?._id === id);

const handleSelect = (item) => {
  if (!isSelected(item._id)) {
    const updated = [...value, item];
    onChange(updated);
    dispatch(setMultipleCompanyDetails(updated)); 
  }
};
 const handleRemove = (id) => {
  const newValue = value.filter((tag) => tag._id !== id);
  onChange(newValue); 
  dispatch(removeCompanyDetail(id)); 
};

  // Add custom tag on Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      const exists = value.some(
        (tag) => tag.title.toLowerCase() === searchTerm.toLowerCase()
      );
      if (!exists) {
        onChange([...value, { _id: Date.now(), title: searchTerm }]);
      }
      setSearchTerm("");
      setShowMenu(false);
      e.preventDefault();
    }
  };

  return (
    <div className="w-full flex flex-col gap-1  relative" ref={containerRef}>
      {/* Input Container with tags */}
      <div
        className={`relative min-h-[50px] rounded-[10px] border transition-all duration-300 flex flex-wrap items-center gap-2 px-3 py-2
          ${error ? "border-red-500" : isActive ? "border-black" : "border-lightGray"}`}
        onClick={() => !readOnly && setShowMenu(true)}
      >

        <label
          className={`absolute left-4 px-1 bg-white text-[13px] pointer-events-none transition-all duration-300
           ${
              isActive
                ? `-top-3 ${error ? "text-red-500" : "text-black"}`
                : "-top-3 text-lightGray"
            }
          `}
        >
          {label}
        </label>
        {/* Selected tags */}
        {value.map((tag) => (
          <div
            key={tag?._id}
            className="bg-[#F4F9FD] px-2 py-1 rounded-[6px] text-xs md:text-[13px] flex gap-1 items-center"
          >
            <span>#</span>
            {tag.title}
            {!readOnly && (
              <span
                className="cursor-pointer text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(tag._id);
                }}
              >
                <RxCross2 />
              </span>
            )}
          </div>
        ))}

        {/* Input for typing */}
        <input
          id={name}
          name={name}
          value={searchTerm}
          readOnly={readOnly}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? label : ""}
          className={`flex-1 min-w-[100px] outline-none text-black text-sm
            ${readOnly && "text-gray-500 bg-transparent select-none"}`}
        />

        {/* Dropdown Arrow */}
        <div
          className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-200
            ${showMenu ? "rotate-180" : ""}`}
        >
          <AngleArrowSvg />
        </div>
      </div>

      {/* Dropdown Menu */}
      {showMenu && !readOnly && (
        <div className="absolute left-0  z-2 top-20 xs:top-[55px] w-full bg-white rounded-md border border-black/20 shadow-lg ">
          {/* Search inside dropdown */}
          <div className="p-3">
            <input
              type="text"
              placeholder="Search company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex justify-center py-4">
              <ClipLoader size={20} color="#000066" />
            </div>
          )}

          {/* Error */}
          {isError && (
            <p className="text-center text-xs text-red-500 py-3">
              Failed to load Companies
            </p>
          )}

          {/* Empty */}
          {!isLoading && !isError && docs?.length === 0 && (
            <p className="text-center text-xs text-gray-400 py-3">
              No Companies found
            </p>
          )}

          {/* Company List */}
          {!isLoading && !isError && docs?.length > 0 && (
            <ul className="py-2 max-h-[220px] overflow-auto">
              {docs.map((item) => (
                <li
                  key={item._id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isSelected(item._id)) handleRemove(item._id);
                    else handleSelect(item);
                    setShowMenu(false);
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer transition-colors
                    ${isSelected(item._id) ? "bg-black text-white" : "hover:bg-primary/5"}`}
                >
                  {item?.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Error message */}
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default InputTags;
