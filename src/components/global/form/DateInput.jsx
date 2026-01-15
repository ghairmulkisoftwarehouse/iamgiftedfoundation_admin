import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BirthdateSVG from "../../../assets/svgs/DateBrithSVG";
import { FaClock } from "react-icons/fa";
import TimePicker from "../../../components/global/timepiker/TimePicker";
import useClickOutside from "../../../utils/clickOutside";

const DateInput = ({ label = "Start Date", value, onDateChange, onTimeChange, error }) => {
  const [focused, setFocused] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useClickOutside(containerRef, () => {
    setShowTime(false);
    setShowDatePicker(false);
    setFocused(false);
  });

  const toggleTime = () => {
    setShowTime((prev) => !prev);
    setShowDatePicker(false);
    setFocused(true);
  };

  const handleInputClick = () => {
    setShowTime(false);
    setShowDatePicker(true);
    setFocused(true);
  };

  const handleDateChange = (date) => {
    onDateChange(date);
    setShowDatePicker(false);
    setFocused(true);
  };

  // Safely combine date and time
  const dateString = value.date ? value.date.toISOString().split("T")[0] : "";
  const timeString = value.time || "";
  const combinedValue =
    dateString && timeString ? `${dateString} ${timeString}` : dateString || timeString;

  // Label is active if focused or a value is selected
  const isActive = focused || value.date || value.time;

  return (
    <div className="flex flex-col gap-1.5 relative" ref={containerRef}>
      <div
        className={`relative h-[50px] rounded-[10px] border px-4 flex items-center cursor-pointer
          ${error ? "border-red-500" : isActive ? "border-black" : "border-lightGray"}
        `}
      >
        <input
          type="text"
          value={combinedValue}
           placeholder="00-00-00 00:00"  
          readOnly
          className="h-full  outline-none  text-black  text-[13px] sm:text-sm  transition-all duration-200 w-full cursor-pointer"
          onClick={handleInputClick}
          ref={inputRef}
        />

        <button
          type="button"
          onClick={toggleTime}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          {showTime ? <BirthdateSVG /> : <FaClock className="text-gray-600" />}
        </button>

        {/* Date Picker */}
        {showDatePicker && (
          <div className="absolute rounded-md overflow-auto   top-[51px]  z-20">
            <DatePicker
              selected={value.date}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              inline
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
            />
          </div>
        )}

        {/* Floating Label */}
        <label
          className={`absolute left-4 px-1 bg-white text-[13px] pointer-events-none transition-all duration-300
          ${
            isActive
              ? `-top-3 ${error ? 'text-red-500' : 'text-black'}`
              : `-top-3 text-gray-400 ${error ? 'text-red-500' : 'text-black'}`
          }
          `}
        >
          {label}
        </label>

        {/* Time Picker */}
        {showTime && (
          <div className="absolute bg-white shadow-lg rounded-md  top-[51px]  overflow-auto z-20">
            <TimePicker value={value.time} onChange={onTimeChange} />
          </div>
        )}
      </div>

     {error && (
        <span className="text-red-500 text-[11px] sm:text-xs">
          {error}
        </span>
      )}
    </div>
  );
};

export default DateInput;
