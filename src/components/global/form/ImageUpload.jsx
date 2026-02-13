import React, { useState, useRef,useEffect } from 'react';
import SettingProfileSVG from '../../../assets/svgs/SettingProfileSVG';

const MAX_FILE_SIZE_MB = 4;
const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png'];
const ImageUpload = ({ label, imagePreview, setImagePreview, error }) => {
  const fileInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [fileName, setFileName] = useState('');




    useEffect(() => {
    if (!imagePreview) {
      setFileName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [imagePreview]);
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage('');

    const isValidType = VALID_IMAGE_TYPES.includes(file.type);
    const isValidSize = file.size <= MAX_FILE_SIZE_MB * 1024 * 1024;

if (!isValidType) {
  setErrorMessage('Invalid format. Only JPG and PNG images are allowed.');
  resetImage();
  return;
}

    if (!isValidSize) {
      setErrorMessage('File is too large. Please upload a file smaller than 4MB.');
      resetImage();
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const resetImage = () => {
    setImagePreview(null);
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="rounded-xl  flex items-center gap-6">
      <div className="flex flex-col items-center sm:items-start gap-3 w-full">
        
        {/* Label */}
        <div className="w-[110px] text-center">
          <h3 className="font-medium text-xs md:text-sm px-1 text-black">
            {label}
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-5">
          
          {/* Image Preview */}
          <div
  onClick={triggerFileInput}
  className={`
    w-[106px] h-[70px] bg-lightmist rounded-[15px]
    flex items-center justify-center overflow-hidden cursor-pointer
    ${
      imagePreview
        ? 'border-none'
        : error || errorMessage
        ? 'border border-red-500 border-dashed'
        : 'border border-black/25 border-dashed'
    }
  `}
>

            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-[15px]"
              />
            ) : (
              <SettingProfileSVG className="w-full h-full object-cover" />
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:items-start items-center gap-1">
            {fileName && (
              <p className="text-sm text-gray-700 truncate max-w-[220px]">
                {fileName}
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={triggerFileInput}
                className="text-white  cursor-pointer bg-[#001719] px-3.5 h-[36px] rounded-[8px] font-medium text-xs sm:text-sm"
              >
               {imagePreview ? 'Change Image ':'Upload New'} 
              </button>

              {imagePreview && (
                <button
                  type="button"
                  onClick={resetImage}
                  className="text-red-500 font-medium text-xs sm:text-sm cursor-pointer"
                >
                  Remove
                </button>
              )}
                <p className="text-xs text-gray-500">
              Recommended Size: 1200 × 600 px (JPG / PNG)
            </p>

            </div>

          
            {(errorMessage || error) && (
              <p className="text-xs text-red-500">
                {errorMessage || error}
              </p>
            )}
          </div>
        </div>

        {/* Hidden Input */}
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
