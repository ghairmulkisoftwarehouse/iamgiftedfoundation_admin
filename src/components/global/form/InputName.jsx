import React, { useState } from 'react';

const InputName = ({ label, type = 'text', name, value, onChange, error, readOnly = false, ...rest }) => {
  const [focused, setFocused] = useState(false);

  const isActive = focused || (value !== undefined && value !== '');

  return (
  <div className="w-full flex flex-col gap-1">
  <div
    className={`w-full relative h-[50px] transition-all duration-300 rounded-full border ${
      error ? 'border-red-500' : focused || isActive ? 'border-black' : 'border-lightGray'
    }`}
  >
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      readOnly={readOnly}
      onFocus={!readOnly ? () => setFocused(true) : undefined}
      onBlur={!readOnly ? () => setFocused(false) : undefined}
      onChange={onChange}
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
      className={`absolute left-4 px-1 bg-white transition-all duration-300 pointer-events-none
        ${
          isActive
            ? `-top-3 text-[13px] ${error ? 'text-red-500' : 'text-black'}`
            : `-top-3 text-lightGray ${error ? 'text-red-500' : 'text-lightGray'}`
        }
      `}
    >
      {label}
    </label>
  </div>

  {/* Error Message */}
  {error && <div className="text-red-500 text-[11px] sm:text-xs ">{error}</div>}
</div>
  );
};

export default InputName;
2