import { useState,useEffect } from "react";
import InputName from "../../global/form/InputName";
import Editor from "../../global/form/Editor";
import ErrorBoundary from "../../global/ErrorBoundary";
import MultipleImage from "../../global/form/MultipleImage";
import { useDispatch, useSelector } from "react-redux";
import SubmitLoading from "../../global/SubmitLoading";
import { useQueryClient } from "react-query";
import { useNavigate, } from "react-router-dom";
import { Update_Piller } from "../../../redux/actions/pillarActions";
import { toast } from "react-toastify"; 
import { useParams } from "react-router-dom";

const PillerForm = () => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // const { createLoading } = useSelector((state) => state.post);
    const { patchLoading,docDetails } = useSelector(state => state.piller);

    // console.log('docDetails',docDetails)


const {id}=useParams();
  const [formData, setFormData] = useState({
    title: "",
    subTitle:'',
    description: "",
    description2:"",
    whyDonate:"",
  
  });



  useEffect(() => {
  if (docDetails) {
    setFormData({
      title: docDetails?.title || "",
      subTitle: docDetails?.subTitle || "",
      description: docDetails?.description || "",
      description2: docDetails?.description2 || "",
      whyDonate: docDetails?.whyDonate || "",
    });
  }
}, [docDetails]);
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
      subTitle:"",
      description: "",
      description2:'',
          whyDonate:"",

  
    });

    setErrors({});
  };
const handleSubmit = async () => {
  const validationErrors = {};


  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) return;

  const payload = {
    ...(formData.title && { title: formData.title }),
    ...(formData.subTitle && { subTitle: formData.subTitle }),
    ...(formData.description && { description: formData.description }),
    ...(formData.description2 && { description: formData.description2 }),
    ...(formData.whyDonate && { whyDonate: formData.whyDonate}),
  };

  console.log("payload", payload);


  try {
    await dispatch(Update_Piller(id, payload, toast, navigate));

    queryClient.invalidateQueries("fetch-all-piller");

    resetForm();
  } catch (error) {
    console.error(error);
    toast.error("Failed to update post");
  }
};

  return (
    <div className="bg-white rounded-[15px] pt-5 pb-11 flex flex-col gap-7 w-full">
      {/* Basic Section */}
      <div className="flex flex-col xl:flex-row items-start gap-4 xl:gap-2.5 w-full pb-12 border-b px-5 border-black/40">
        {/* Left Side */}
        <div className="w-full xl:w-[25%] flex flex-col gap-0.5">
          <h2 className="font-medium text-base sm:text-lg xl:text-[20px]">
            Piller Basics
          </h2>
          <p className="text-xs sm:text-sm text-black/50 leading-[21px]">
            Provide basic information about your post.
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full xl:w-[75%] grid grid-cols-1 gap-5 sm:gap-4">
          {/* Title */}

                              <div className="sm:col-span-2">

          <InputName
            label="Title"
            value={formData.title}
            onChange={handleChange("title")}
            error={errors.title}
          />
          </div>
                    <div className="sm:col-span-2">


            <InputName
            label="Sub Title"
            value={formData.subTitle}
            onChange={handleChange("subTitle")}
            error={errors.subTitle}
          />
          </div>

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


   {/* Description */}
          <div className="sm:col-span-2">
            <ErrorBoundary>
              <Editor
                content={formData.description2}
                setContent={(value) =>
                  setFormData((prev) => ({ ...prev, description2: value }))
                }
                error={errors.description2}
              />
            </ErrorBoundary>
          </div>
        

                 <div className="sm:col-span-2">

          <InputName
            label="Why Donate"
            value={formData.whyDonate}
            onChange={handleChange("whyDonate")}
            error={errors.whyDonate}
          />
          </div>

          {/* <div className="sm:col-span-2">
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
          </div> */}
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
            patchLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={patchLoading}
        >
          {patchLoading ? <SubmitLoading size={12} /> : "Update Piller"}
        </button>
      </div>
    </div>
  );
};

export default PillerForm;