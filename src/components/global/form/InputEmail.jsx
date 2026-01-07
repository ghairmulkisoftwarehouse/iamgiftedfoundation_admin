const InputEmail = ({
  label,
  placeholder,
  value,
  onChange,
  name,
  error,
  icon, 
  background = "bg-[#E5E7E7]",
  border = "border-transparent",
    
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="font-medium text-sm sm:text-[15px] px-1 text-[#252C62]"
      >
        {label}
      </label>

      <div
        className={`
          w-full h-[50px] rounded-full relative flex items-center  

          border ${error ? "border-red-500" : border}
        `}
      >
    
        {icon && (
          <span className="absolute left-4 text-gray-500">
            {icon}
          </span>
        )}

        <input
          type="email"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            outline-none w-full h-full rounded-full text-sm
                placeholder:text-[#B2BCC5]
            ${background}
            ${icon ? "pl-14 pr-4" : "px-4"}
          `}
        />
      </div>

      {error && (
        <p className="text-xs xs:text-[13px] text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputEmail;




