const InputTextArea = ({ label, placeholder, value, onChange, name, error, rows = 6 }) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="font-medium   text-sm sm:text-[15px] px-1 text-[#252C62]"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`outline-none bg-[#E5E7E7] w-full rounded-[29px] px-3 py-2 text-sm 

          resize-vertical min-h-[100px]
          ${error ? " border  border-red-500" : ""}`}
      />
      {error && <p className="text-xs xs:text-[13px] text-red-500">{error}</p>}
    </div>
  );
};

export default InputTextArea;