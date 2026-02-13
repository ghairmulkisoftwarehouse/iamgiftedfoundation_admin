import { useState,useEffect } from 'react';
import InputName  from '../../global/form/InputName';
import Editor   from '../../global/form/Editor';
import ErrorBoundary  from '../../global/ErrorBoundary';
import MultipleImage   from '../../global/form/MultipleImage';
import {validateTeamForm} from '../../../validations/teamValidation'
import InputOption   from '../../../components/global/form/InputOption';
import ImageUpload   from '../../global/form/ImageUpload';
import {update_Impact} from '../../../redux/actions/teamActions';
import {useQueryClient } from 'react-query';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 

import { toast } from 'react-toastify';
import SubmitLoading from "../../global/SubmitLoading";
import { useParams } from 'react-router-dom';
import { convertImageUrlToBase64} from '../../../utils/convertImageUrlToBase64';
import { baseURL } from '../../../config/api';
const UpdateTeamForm = () => {


     const dispatch = useDispatch();
   const  navigate =useNavigate();
  const  {id}=useParams();

  const { docDetails } = useSelector(state => state.team);
  const  teamdoc=docDetails?.doc

  // console.log(' this is a teadoc',teadoc)


  const [errors, setErrors] = useState({});
     const queryClient = useQueryClient();
   const { patchLoading } = useSelector(state => state.team);

     const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    designation:"",
    description: "",
     coverImage: null,

 

  });




     useEffect(() => {
    if (teamdoc) {
      setFormData({
        name: teamdoc?.title || '',
        designation: teamdoc?.designation || '',
       description: teamdoc?.description || '',

      });
    }
  }, [teamdoc]);

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



  useEffect(() => {
    const initializeImage = async () => {
      const imageUrl = teamdoc?.image?.relativeAddress; // get existing image
      if (!imageUrl) return;
  
      const fullImageUrl = imageUrl.startsWith("http")
        ? imageUrl
        : `${baseURL}/${imageUrl}`;
  
      const base64Image = await convertImageUrlToBase64(fullImageUrl);
  
      setImagePreview(base64Image); 
      setFormData((prev) => ({ ...prev, coverImage: base64Image })); 
    };
  
    if (docDetails) initializeImage();
  }, [docDetails]);

  const resetForm = () => {
  setFormData({
    name: "",
    description: "",
    designation:"",

        coverImage: null,

   
  });
    setImagePreview('');

  setErrors({});     
};

const handleSubmit = async () => {
  const payload = {
    ...(formData.name && { title: formData.name }),
    ...(formData.designation && { designation: formData.designation }),
    ...(imagePreview && { imageDataURI: imagePreview }),
    ...(formData.description && { description: formData.description }),
  };

  try {
    await dispatch(update_Impact(id,payload, toast, navigate));
    queryClient.invalidateQueries('fetch-all-team');
     queryClient.invalidateQueries('fetch-singleTeam');

  } catch (error) {
    console.error(error);
  }
};



  return (
    <div className=" bg-white   rounded-[15px]   pt-5  pb-11 flex flex-col gap-7  w-full ">
    {/* event basic  */}
    <div className=" flex flex-col xl:flex-row items-start gap-4 xl:gap-2.5 w-full pb-12 border-b px-5 border-black/40">
     <div className=" w-full xl:w-[25%]   flex flex-col gap-0.5">
     <h2 className=" font-medium  text-base sm:text-lg xl:text-[20px]">Team Basics</h2>
     <p className=" text-xs sm:text-sm  text-black/50  leading-[21px]">Tell us about your cause and what you're raising funds for.</p> 
     </div>
     <div className=" w-full xl:w-[75%] grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4 ">
     <div className=' sm:col-span-2'>
    <div className="sm:col-span-2">
            <ImageUpload
              label="Cover Image"
              imagePreview={imagePreview}
              setImagePreview={(img) => {
                setImagePreview(img);
                setFormData((prev) => ({ ...prev, coverImage: img }));

                setErrors((prev) => {
                  const updated = { ...prev };
                  delete updated.coverImage;
                  return updated;
                });
              }}
              error={errors.coverImage}
            />
          </div>

     </div>
       <InputName
            label="Name"
            value={formData.name}
            onChange={handleChange("name")}
            error={errors.name}
          />


           <InputName
            label="Designation"
            value={formData.designation}
            onChange={handleChange("designation")}
            error={errors.designation}
          />
            {/* <InputOption
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={(val) => {
                setFormData((prev) => ({ ...prev, designation: val }));
                setErrors((prev) => {
                  const updated = { ...prev };
                  delete updated.designation;
                  return updated;
                });
              }}
              error={errors.designation}
              options={[
                { id: 1, title: "Social Media Manager" },
                { id: 2, title: "Frontend Developer" },
                { id: 3, title: "Backend Developer" },
                { id: 4, title: "UI/UX Designer" },
                { id: 5, title: "Project Manager" },
              ]}
            /> */}

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
     </div>

    </div>



  

          <div className="flex flex-row gap-2 items-center justify-end w-full  px-3.5 ">
     <button
    type="button"
    onClick={resetForm}  
    className="btn-secondary w-[50%] sm:w-[148px] h-[50px]"
  >
    Cancel
  </button>
        <button
          onClick={handleSubmit}
         className={`btn-primary w-[50%] sm:w-[210px] h-[50px] 
      ${patchLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
          
        >
          {patchLoading ? <SubmitLoading size={12} /> : 'Update Team'}

        </button>


      
      </div>
    
    </div>
  )
}

export default UpdateTeamForm