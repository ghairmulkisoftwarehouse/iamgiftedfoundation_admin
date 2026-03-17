import { forwardRef } from "react";
import VideoSvg from '../../../assets/svgs/VideoSvg';

const VideoUploadField = forwardRef(({ handleVideoUpload, videoPreview, removeVideo }, ref) => {
  return (
    <div className="sm:col-span-2 flex flex-col gap-2 w-full">
      <label className="block text-sm font-medium">Upload Video</label>

      {!videoPreview ? (
        <div
          className="flex items-center gap-2 border rounded-md p-3 bg-gray-50 cursor-pointer hover:bg-gray-100"
          onClick={() => ref.current && ref.current.click()}
        >
          <VideoSvg className="w-6 h-6 text-gray-500" />
          <p className="text-xs sm:text-sm text-gray-500">
            Please upload your video
          </p>
        </div>
      ) : (
        <div className="relative w-full">
          <video
            src={videoPreview}
            controls
            className="mt-3 w-full max-h-[300px] rounded-lg border"
          />
          <button
            type="button"
            onClick={removeVideo}
            className="absolute top-4 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center cursor-pointer justify-center hover:bg-red-600"
            title="Remove video"
          >
            &times;
          </button>
        </div>
      )}

      <input
        ref={ref}
        type="file"
        accept="video/*"
        onChange={handleVideoUpload}
        className="hidden"
      />
    </div>
  );
});

export default VideoUploadField;