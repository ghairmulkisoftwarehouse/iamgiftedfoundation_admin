import React, { useState, useRef } from 'react';
import Image from 'next/image';
import SettingProfileSVG from '@/assets/svg/SettingProfileSVG';

const MAX_FILE_SIZE_MB = 4;
const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/svg+xml'];

const ImageUpload = ({ label, imagePreview, setImagePreview ,error}) => {
  const fileInputRef = useRef(null);
   const [errorMessage, setErrorMessage]=useState('');
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValidType = VALID_IMAGE_TYPES.includes(file.type);
    const isValidSize = file.size <= MAX_FILE_SIZE_MB * 1024 * 1024;

    if (!isValidType) {
      setErrorMessage('Invalid format. Only JPG, PNG, and SVG are allowed.');
      setImagePreview(null);
      return;
    }

    if (!isValidSize) {
      setErrorMessage('File is too large. Please upload a file smaller than 4MB.');
      setImagePreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setErrorMessage(''); 
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className=" rounded-xl  py-5 flex items-center gap-6">
      <div className="flex flex-col items-center md:items-start gap-3 w-full">
        <div className="w-[110px] text-center">
          <h3      className="font-medium text-sm sm:text-[15px] px-1 text-[#252C62]">{label}</h3>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-5">
          <div 
               onClick={triggerFileInput}
          className={`w-[110px] h-[110px] bg-lightmist rounded-[15px] border ${error  ? 'border-red-500':' border-black/25  '}  border-dashed flex items-center justify-center overflow-hidden`}>
            {imagePreview ? (
              <Image
                width={110}
                height={110}
                src={imagePreview}
                             

                alt="Profile Preview"
                className="w-full h-full object-cover rounded-[15px] max-w-[110px]"
              />
            ) : (
              <SettingProfileSVG className="w-full h-full object-cover" />
            )}
          </div>

          <div className="flex flex-col md:items-start items-center gap-1">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={triggerFileInput}
                className="text-[#030F0CCC] font-medium hover:underline cursor-pointer"
              >
                Upload New
              </button>

              {imagePreview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-red-500 font-medium hover:underline text-xs sm:text-sm  cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>

            <p className="text-xs text-center xs:text-start xs:text-sm text-gray-500">
              Max size: 4MB. Supported formats: JPG, PNG, SVG.
            </p>

            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
          </div>
        </div>
        {error && <p className="text-xs text-bright-red">{error}</p>}

        

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={VALID_IMAGE_TYPES.join(',')}
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
