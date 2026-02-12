import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaClock } from "react-icons/fa";
import TimePicker from "../../../components/global/timepiker/TimePicker";
import useClickOutside from "../../../utils/clickOutside";
import BirthdateSVG from "../../../assets/svgs/DateBrithSVG"; 
const DateInput = ({ label, value, onDateChange, onTimeChange, error }) => {
  const [focused, setFocused] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const containerRef = useRef(null);

  useClickOutside(containerRef, () => {
    setShowTime(false);
    setShowDatePicker(false);
    setFocused(false);
  });

  const toggleTime = () => {
    setShowTime(prev => !prev);
    setShowDatePicker(false);
    setFocused(true);
  };

  const handleInputClick = () => {
    setShowTime(false);
    setShowDatePicker(true);
    setFocused(true);
  };

  const handleDateChangeInternal = (date) => {
    onDateChange(date);
    setShowDatePicker(false);
    setFocused(true);
  };

 const combinedValue =
  value.date
    ? `${value.date.toLocaleDateString("en-CA")}${
        value.time ? ` ${value.time}` : ""
      }`
    : value.time || "";


  const isActive = focused || value.date || value.time;

  return (
    <div className="flex flex-col gap-1.5 relative" ref={containerRef}>
      <div
        className={`relative h-[50px] rounded-[10px] border px-4 flex items-center cursor-pointer
          ${error ? "border-red-500" : isActive ? "border-black" : "border-lightGray"}`}
      >
        <input
          type="text"
          value={combinedValue}
          placeholder="YYYY-MM-DD HH:MM"
          readOnly
          className="h-full outline-none text-black text-[13px] sm:text-sm w-full cursor-pointer"
          onClick={handleInputClick}
        />

        <button type="button" onClick={toggleTime} className="absolute right-3 top-1/2 -translate-y-1/2">
          {showTime ? <BirthdateSVG/>  : <FaClock className="text-gray-600" />}
        </button>

        {showDatePicker && (
          <div className="absolute z-2 top-[51px] rounded-md overflow-auto">
            <DatePicker
              selected={value.date}
              onChange={handleDateChangeInternal}
              dateFormat="yyyy-MM-dd"
              inline
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              minDate={new Date()} // today onwards
            />
          </div>
        )}

        {showTime && (
          <div className="absolute bg-white shadow-lg rounded-md top-[51px] z-2">
            <TimePicker value={value.time} onChange={onTimeChange} />
          </div>
        )}

        <label
          className={`absolute left-4 px-1 bg-white text-[13px] pointer-events-none transition-all duration-300
            ${isActive ? `-top-3 ${error ? "text-red-500" : "text-black"}` : "-top-3 text-gray-400"}`}
        >
          {label}
        </label>
      </div>
      {error && <span className="text-red-500 text-[11px] sm:text-xs">{error}</span>}
    </div>
  );
};

export default DateInput;
