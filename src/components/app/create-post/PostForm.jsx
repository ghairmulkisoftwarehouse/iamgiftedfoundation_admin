import { useState } from "react";
import InputName from "../../global/form/InputName";
import Editor from "../../global/form/Editor";
import ErrorBoundary from "../../global/ErrorBoundary";
import MultipleImage from "../../global/form/MultipleImage";
import { useDispatch, useSelector } from "react-redux";
import SubmitLoading from "../../../components/global/SubmitLoading";
import { useQueryClient } from "react-query";
import { useNavigate, } from "react-router-dom";
import { Add_Post } from "../../../redux/actions/postActions";
import { validatePostForm } from "../../../validations/postValidation";
import { toast } from "react-toastify"; 

const PostForm = () => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { createLoading } = useSelector((state) => state.post);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    gallery: [],
    isFeatured: false,
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      gallery: [],
      isFeatured: false,
    });

    setErrors({});
  };

  const handleSubmit = async () => {
    const validationErrors = validatePostForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const galleryUrls = formData.gallery?.length
      ? formData.gallery.map((item) => item.url)
      : [];

    const payload = {
      title: formData.title,
      ...(formData.description && { body: formData.description }),
      ...(galleryUrls.length > 0 && { attachmentsDataURIs: galleryUrls }),
      isFeatured: formData.isFeatured,
    };

    try {
      await dispatch(Add_Post(payload, toast, navigate));
      queryClient.invalidateQueries("fetch-all-post");
      
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add post");
    }
  };

  return (
    <div className="bg-white rounded-[15px] pt-5 pb-11 flex flex-col gap-7 w-full">
      {/* Basic Section */}
      <div className="flex flex-col xl:flex-row items-start gap-4 xl:gap-2.5 w-full pb-12 border-b px-5 border-black/40">
        {/* Left Side */}
        <div className="w-full xl:w-[25%] flex flex-col gap-0.5">
          <h2 className="font-medium text-base sm:text-lg xl:text-[20px]">
            Post Basics
          </h2>
          <p className="text-xs sm:text-sm text-black/50 leading-[21px]">
            Provide basic information about your post.
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full xl:w-[75%] grid grid-cols-1 gap-5 sm:gap-4">
          {/* Title */}
          <InputName
            label="Title"
            value={formData.title}
            onChange={handleChange("title")}
            error={errors.title}
          />

          {/* Description */}
          <div className="sm:col-span-2">
            <ErrorBoundary>
              <Editor
                content={formData.description}
                setContent={(value) =>
                  setFormData((prev) => ({ ...prev, description: value }))
                }
                error={errors.description}
              />
            </ErrorBoundary>
          </div>

          {/* Image Upload */}
          <div className="sm:col-span-2">
            <MultipleImage
              label="Image Uploads"
              value={formData.gallery}
              onChange={(images) => {
                setFormData((prev) => ({ ...prev, gallery: images }));
                setErrors((prev) => {
                  const updated = { ...prev };
                  delete updated.gallery;
                  return updated;
                });
              }}
              error={errors.gallery}
            />
          </div>

          {/* Featured Checkbox */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isFeatured: e.target.checked,
                  }))
                }
                className="w-4 h-4 accent-black cursor-pointer"
              />
              <label
                htmlFor="isFeatured"
                className="font-medium text-xs sm:text-sm text-black/80"
              >
                Featured Post
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-row gap-2 items-center justify-end w-full px-3.5">
        <button
          type="button"
          onClick={resetForm}
          className="btn-secondary w-[50%] sm:w-[148px] h-[50px]"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className={`btn-primary w-[50%] sm:w-[210px] h-[50px] ${
            createLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={createLoading}
        >
          {createLoading ? <SubmitLoading size={12} /> : "Create Post"}
        </button>
      </div>
    </div>
  );
};

export default PostForm;