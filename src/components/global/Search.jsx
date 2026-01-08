import { memo } from 'react';
import SearchSvg from '../../assets/svgs/SearchSvg';

const Search = () => {
  return (
    <div className="flex flex-row gap-2 w-full">
      {/* Search Input */}
      <div className="bg-white w-[75%] h-[40px] rounded-[10px] relative flex items-center border border-[#DCE4E8]">
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400">
          <SearchSvg />
        </div>

        <input
          type="text"
          placeholder="Search here"
          className="w-full h-full pl-8 outline-none text-sm rounded-[10px]"
        />
      </div>

      {/* Search Button */}
      <button
        type="button"
        className="
          w-[25%] h-[40px] rounded-[10px]
          flex items-center justify-center text-sm
          border border-[#DCE4E8] bg-white
          cursor-pointer
          transition-all duration-200
          hover:bg-[#0F172A] hover:text-white hover:border-[#0F172A]
          active:scale-95
          focus:outline-none focus:ring-2 focus:ring-[#0F172A]/30
        "
      >
        Search
      </button>
    </div>
  );
};

export default memo(Search);
