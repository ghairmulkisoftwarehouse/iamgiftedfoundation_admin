import { useState, useEffect } from "react";
import ImageUpload from "../../global/form/ImageUpload";
import InputName from "../../global/form/InputName";
import Editor from "../../global/form/Editor";
import ErrorBoundary from "../../global/ErrorBoundary";
import MultipleImage from "./fromUpdate/MultipleImage";
import AllPillerInput from "./fromUpdate/AllPillerInput";

import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SubmitLoading from "../../../components/global/SubmitLoading";
import { toast } from "react-toastify";

import { update_Programs, delete_ProgramsImages } from "../../../redux/actions/programsAction";

import { convertImageUrlToBase64 } from "../../../utils/convertImageUrlToBase64";
import { baseURL } from "../../../config/api";

const ProgramsForm = ({ programdoc }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { patchLoading } = useSelector((state) => state.program);

  const [imagePreview, setImagePreview] = useState("");

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    piller: "",
    description: "",
    gallery: [],
    coverImage: null,
  });

  // Populate basic fields
  useEffect(() => {
    if (programdoc) {
      setFormData((prev) => ({
        ...prev,
        title: programdoc?.title || "",
        description: programdoc?.body || "",
        piller: programdoc?.piller?._id || "",
      }));
    }
  }, [programdoc]);

  // Load Featured Image
  useEffect(() => {
    const initializeImage = async () => {
      if (!programdoc?.featuredImage?.relativeAddress) {
        setImagePreview("");
        return;
      }

      try {
        const imageUrl = programdoc.featuredImage.relativeAddress;

        const fullImageUrl = imageUrl.startsWith("http")
          ? imageUrl
          : `${baseURL}/${imageUrl}`;

        const base64Image = await convertImageUrlToBase64(fullImageUrl);

        if (base64Image) {
          setImagePreview(base64Image);

          setFormData((prev) => ({
            ...prev,
            coverImage: base64Image,
          }));
        }
      } catch (error) {
        console.error("Featured image conversion error:", error);
      }
    };

    initializeImage();
  }, [programdoc]);

  // Load Gallery Images
  useEffect(() => {
    const initializeGallery = async () => {
      if (!programdoc?.images || programdoc.images.length === 0) {
        setFormData((prev) => ({
          ...prev,
          gallery: [],
        }));
        return;
      }

      try {
        const galleryBase64 = await Promise.all(
          programdoc.images.map(async (img) => {
            if (!img?.relativeAddress) return null;

            const fullUrl = img.relativeAddress.startsWith("http")
              ? img.relativeAddress
              : `${baseURL}/${img.relativeAddress}`;

            const base64 = await convertImageUrlToBase64(fullUrl);

            return base64
              ? {
                  url: base64,
                  _id: img._id,
                  isExisting: true,
                }
              : null;
          })
        );

        setFormData((prev) => ({
          ...prev,
          gallery: galleryBase64.filter(Boolean),
        }));
      } catch (error) {
        console.error("Gallery conversion error:", error);
      }
    };

    initializeGallery();
  }, [programdoc]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleSelectChange = (field) => (value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

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
      piller: "",
      description: "",
      gallery: [],
      coverImage: null,
    });

    setImagePreview("");
    setErrors({});
  };

  const handleSubmit = async () => {
    try {
      const gallery = formData.gallery || [];

      const newImages = gallery
        .filter((img) => !img.isExisting)
        .map((img) => img.url);

      const payload = {
        ...(formData.title && { title: formData.title }),

        ...(formData.piller && { piller: formData.piller }),

        ...(imagePreview && {
          featuredImageDataURI: imagePreview,
        }),

        ...(formData.description && {
          body: formData.description,
        }),

        ...(newImages.length > 0 && {
          imagesDataURIs: newImages,
        }),
      };

      await dispatch(update_Programs(id, payload, toast, navigate));

      queryClient.invalidateQueries("fetch-all-program");

      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update Program");
    }
  };

  return (
    <div className="bg-white rounded-[15px] pt-5 pb-11 flex flex-col gap-7 w-full">

      {/* Programs Basics */}

      <div className="flex flex-col xl:flex-row items-start gap-4 xl:gap-2.5 w-full pb-12 border-b px-5 border-black/40">

        <div className="w-full xl:w-[25%] flex flex-col gap-0.5">
          <h2 className="font-medium text-lg">Programs Basics</h2>
          <p className="text-sm text-black/50">
            Tell us about your cause and what you're raising funds for.
          </p>
        </div>

        <div className="w-full xl:w-[75%] grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div className="sm:col-span-2">
            <ImageUpload
              label="Cover Image"
              imagePreview={imagePreview}
              setImagePreview={(img) => {
                setImagePreview(img);

                setFormData((prev) => ({
                  ...prev,
                  coverImage: img,
                }));

                setErrors((prev) => {
                  const updated = { ...prev };
                  delete updated.coverImage;
                  return updated;
                });
              }}
              error={errors.coverImage}
            />
          </div>

          <InputName
            label="Title"
            value={formData.title}
            onChange={handleChange("title")}
            error={errors.title}
          />

          <AllPillerInput
            label="Piller"
            selected={formData.piller}
            onSelect={handleSelectChange("piller")}
            error={errors.piller}
          />

        </div>
      </div>

      {/* Story */}

      <div className="flex flex-col xl:flex-row gap-4 w-full pb-6 border-b px-5 border-black/40">

        <div className="w-full xl:w-[25%]">
          <h2 className="font-medium text-lg">Story</h2>
          <p className="text-sm text-black/50">
            Tell your story. Inspire people to care and contribute.
          </p>
        </div>

        <div className="w-full xl:w-[75%] grid gap-5">

          <ErrorBoundary>
            <Editor
              content={formData.description}
              setContent={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  description: value,
                }))
              }
              error={errors.description}
            />
          </ErrorBoundary>

          <MultipleImage
            value={formData.gallery}
            onChange={(images, removedImage) => {

              if (removedImage?.isExisting && removedImage?._id) {
                dispatch(delete_ProgramsImages(removedImage._id, toast));
              }

              setFormData((prev) => ({
                ...prev,
                gallery: images || [],
              }));
            }}
            error={errors.gallery}
          />

        </div>
      </div>

      {/* Buttons */}

      <div className="flex gap-2 justify-end px-4">

        <button
          type="button"
          onClick={resetForm}
          className="btn-secondary w-[150px] h-[50px]"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className={`btn-primary w-[210px] h-[50px] ${
            patchLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {patchLoading ? <SubmitLoading size={12} /> : "Update Program"}
        </button>

      </div>
    </div>
  );
};

export default ProgramsForm;