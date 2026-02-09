import React, {useRef, useState } from 'react';
import { codelist } from '../../../constants/dataConstants';
import AngleArrowSvg from '../../../assets/svgs/AngleArrowSvg';

import useClickOutside from "../../../utils/clickOutside";
const InputPhoneNumber = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  error,
  readOnly = false,
  ...rest
}) => {
    const containerRef = useRef(null);  
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState(
    codelist.find(c => c.code === '+92') || codelist[0]
  );

  const isActive = focused || (value !== undefined && value !== '');

useClickOutside(containerRef, () => setOpen(false));

  return (
    <div className="w-full flex flex-col gap-1" ref={containerRef}>
      <div
        className={`w-full relative h-[50px] transition-all duration-300 rounded-[10px] border ${
          error ? 'border-red-500' : focused || isActive ? 'border-black' : 'border-lightGray'
        }`}
      >
        {/* Country Code Selector */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
          <div
            onClick={() => setOpen(!open)}
            className=" h-[40px] px-2 text-[#1A1C1E] flex items-center gap-1 text-xs cursor-pointer bg-white"
          >
            <p>{selectedCode.code}</p>
            <span
    className={`transition-transform duration-200 ${
      open ? "rotate-180" : "rotate-0"
    }`}
  >
    <AngleArrowSvg />
  </span>
          </div>

          {open && (
            <div className="absolute top-[42px] left-0 z-50 max-h-56  w-fit overflow-y-auto  bg-white shadow-md text-xs">
              {codelist.map(item => (
                <div
                  key={`${item.code}-${item.country}`}
                  onClick={() => {
                    setSelectedCode(item);
                    setOpen(false);
                  }}
                  className="px-2 py-1 cursor-pointer hover:bg-gray-100 flex justify-between"
                >
                  <span>{item.code}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Phone Input */}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          readOnly={readOnly}
          onFocus={!readOnly ? () => setFocused(true) : undefined}
          onBlur={!readOnly ? () => setFocused(false) : undefined}
          onChange={onChange}
          className={`w-full h-full pl-[90px] pr-4 rounded-[10px] outline-none text-[13px] sm:text-sm transition-all duration-200
            ${readOnly ? 'text-gray-500 bg-transparent select-none' : ''}
          `}
          {...rest}
        />

        {/* Floating Label */}
        <label
          htmlFor={name}
          className={`absolute left-4 px-1 text-[13px] sm:text-sm bg-white transition-all duration-300 pointer-events-none
            ${
              isActive
                ? `-top-3 ${error ? 'text-red-500' : 'text-black'}`
                : `-top-3 ${error ? 'text-red-500' : 'text-lightGray'}`
            }
          `}
        >
          {label}
        </label>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 text-[11px] sm:text-xs">{error}</div>}
    </div>
  );
};

export default InputPhoneNumber;
