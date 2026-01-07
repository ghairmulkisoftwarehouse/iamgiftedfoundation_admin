import React, { useState } from 'react';
import EyeUnseenSvg from '../../../assets/svgs/EyeUnseenSvg';
import EyeSeenSvg from '../../../assets/svgs/EyeSeenSvg';

const PasswordInput = ({ label, name, value, onChange, error, readOnly = false, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const isActive = focused || (value !== undefined && value !== '');

  return (
    <div className="w-full flex flex-col gap-1 relative">
      <div
    className={`w-full relative h-[50px] transition-all duration-300 rounded-full border ${
      error ? 'border-red-500' : focused || isActive ? 'border-black' : 'border-lightGray'
    }`}
  >
        <input
          id={name}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          readOnly={readOnly}
          onFocus={!readOnly ? () => setFocused(true) : undefined}
          onBlur={!readOnly ? () => setFocused(false) : undefined}
          onChange={onChange}
          autoComplete="off"
      className={`w-full h-full px-4 rounded-full text-blacl outline-none text-sm sm:text-base transition-all duration-200
        ${
          readOnly
            &'text-gray-500 bg-transparent select-none'
    
        }
      `}
          {...rest}
        />

        {/* Floating Label */}
        <label
          htmlFor={name}
          className={`absolute left-4 px-1 bg-white transition-all duration-300 pointer-events-none ${
            isActive
              ? `-top-3 text-[13px] ${error ? 'text-red-500' : 'text-black'}`
              : `-top-3 text-gray-400 ${error ? 'text-red-500' : 'text-black'}`
          }`}
        >
          {label}
        </label>

        {/* Eye Icon */}
        <div
          className="absolute top-1/2 right-3 -translate-y-1/2 w-fit cursor-pointer text-dark1 opacity-70 hover:opacity-100"
          onClick={toggleShowPassword}
        >
          {showPassword ? <EyeUnseenSvg /> : <EyeSeenSvg />}
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 text-[11px] sm:text-xs ">{error}</div>}
    </div>
  );
};

export default PasswordInput;
