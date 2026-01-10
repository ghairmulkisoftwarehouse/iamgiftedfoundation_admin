import { useRef, useState } from "react";
import MediaUploadSvg from "../../../assets/svgs/MediaUploadSvg";

const MultipleImage = ({ value = [], onChange,label="Media Uploads", error }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];
  const maxFiles = 5;

  // Handle uploaded files (click or drag)
  const handleUpload = (files) => {
    const newFiles = Array.from(files).slice(0, maxFiles - value.length);

    const readers = newFiles.map((file) => {
      return new Promise((resolve) => {
        if (!allowedTypes.includes(file.type)) return resolve(null);

        const reader = new FileReader();
        reader.onloadend = () => resolve({ file, url: reader.result });
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((images) => {
      const validImages = images.filter(Boolean);
      if (validImages.length > 0) {
        // Pass array directly, don't assume callback like setState
        onChange([...value, ...validImages]);
      }
    });
  };

  const handleFileInputChange = (e) => {
    handleUpload(e.target.files);
    e.target.value = null; // reset input so same file can be selected again
  };

  // Drag & drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files?.length > 0) {
      handleUpload(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  // Remove image
  const handleRemove = (indexToRemove) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-medium text-xs sm:text-sm text-black/80">
         {label}
      </label>

      {/* Hidden file input */}
      <input
        type="file"
        multiple
        accept=".png,.jpg,.jpeg,.svg"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileInputChange}
      />

      {/* Dropzone */}
      <div
        className={`w-full ${
          value.length > 0 ? "bg-white" : "bg-lightmist"
        } ${
          isDragging ? "border-blue-400" : error ? "border-red-500" : "border-gray-300"
        } rounded-md border-2 border-dashed h-auto min-h-[150px] p-3 flex flex-col justify-center cursor-pointer gap-2`}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >

       <div className="flex flex-col gap-1 w-full items-center">
            <MediaUploadSvg />
            <p className="text-xs text-center xs:text-sm text-gray-500">
              Click or drag file to this area to upload
            </p>
          </div>
       
      </div>

       {value.length > 0&&(
         
       
          <div className="flex flex-wrap gap-2">
            {value.map((img, index) => (
              <div
                key={index}
                className="relative w-[140px] h-[140px] shadow-md rounded-md group z-0"
              >
                <img
                  src={img.url}
                  alt={`uploaded-${index}`}
                  className="w-full h-full object-cover rounded-md"
                />
                {/* Remove button */}
                <button
                  className="absolute top-[-5px] right-[-4px] z-50 cursor-pointer bg-[#FD5D69] rounded-full p-1"
                  onClick={() => handleRemove(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4  text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}

            {/* "+ Add More" button if limit not reached */}
            {value.length < maxFiles && (
              <div
                className="w-[140px] h-[140px] border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                <span className="text-gray-500 text-sm">+ Add More</span>
              </div>
            )}
          </div>
        )}

      {/* Error */}
      {error && <div className="text-red-500 text-[11px] sm:text-xs">{error}</div>}
    </div>
  );
};

export default MultipleImage;
