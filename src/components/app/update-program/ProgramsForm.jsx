

import { useState,useEffect } from 'react';
import ImageUpload   from '../../global/form/ImageUpload';
import InputName  from '../../global/form/InputName';
import InputEmail   from '../../global/form/InputEmail';
import InputPhoneNumber   from '../../global/form/InputPhoneNumber';
import InputTags   from '../../global/form/InputTags';
import Editor   from '../../global/form/Editor';
import ErrorBoundary  from '../../global/ErrorBoundary';
import MultipleImage   from './fromUpdate/MultipleImage';
import {validateProgramForm} from '../../../validations/programValidation'
import {useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import SubmitLoading   from '../../../components/global/SubmitLoading';
import { toast } from 'react-toastify';
import devLog from '../../../utils/logsHelper';
import {update_Programs} from '../../../redux/actions/programsAction';
// import ProgramSelectInput from '../../global/form/ProgramSelectInput';
import AllPillerInput   from './fromUpdate/AllPillerInput';
import { convertImageUrlToBase64} from '../../../utils/convertImageUrlToBase64';
import { baseURL } from '../../../config/api';
import { useParams } from 'react-router-dom';
import {delete_ProgramsImages}  from '../../../redux/actions/programsAction'



const ProgramsForm = ({programdoc}) => {

   const dispatch = useDispatch();
   const  navigate =useNavigate();
     const queryClient = useQueryClient();
   const { patchLoading } = useSelector(state => state.program);
   const [imagePreview, setImagePreview] = useState("");
   
   const {id}=useParams();


 

  const [errors, setErrors] = useState({});
      const [formData, setFormData] = useState({
        title: "",
    piller: "",
    description: "",
    gallery: [],
    coverImage: null,

      });



         useEffect(() => {
    if (programdoc) {
      setFormData({
        title: programdoc?.title || '',
        description:programdoc?.body  || '',
       piller:programdoc?.piller?._id  || '',
      
      });
    }
  }, [programdoc]);



  useEffect(() => {
  const initializeImage = async () => {
    const imageUrl = programdoc?.featuredImage?.relativeAddress; 
    if (!imageUrl) return;

    const fullImageUrl = imageUrl.startsWith("http")
      ? imageUrl
      : `${baseURL}/${imageUrl}`;

    const base64Image = await convertImageUrlToBase64(fullImageUrl);

    setImagePreview(base64Image); 
    setFormData((prev) => ({ ...prev, coverImage: base64Image })); 
  };

  if (programdoc) initializeImage();
}, [programdoc]);


useEffect(() => {
  const initializeGallery = async () => {
    if (!programdoc?.images?.length) return;

    const galleryBase64 = await Promise.all(
      programdoc.images.map(async (img) => {
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
  };

  initializeGallery();
}, [programdoc]);


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





  const handleSelectChange = (field) => (value) => {
  setFormData((prev) => ({ ...prev, [field]: value }));
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
  const validationErrors = validateProgramForm(formData);
  setErrors(validationErrors);
  if (Object.keys(validationErrors).length > 0) return;


  try {
    const newImages = formData.gallery
      .filter((img) => !img.isExisting)
      .map((img) => img.url);

    const payload = {
      // piller:formData.piller,
      // title: formData.title,
      
   ...(formData.title && {
          title: formData.title,
      }),

      
    
      ...(formData.piller && {
         piller:formData.piller,
      }),

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

    devLog('this is payload', payload);

    await dispatch(update_Programs(id,payload, toast,navigate));
    queryClient.invalidateQueries('fetch-all-program');

    resetForm();
  } catch (error) {
    console.error(error);
    toast.error('Failed to add Event');
  }
};






  return (
    <div className=" bg-white   rounded-[15px]   pt-5  pb-11 flex flex-col gap-7  w-full ">
    {/* event basic  */}
    <div className=" flex flex-col xl:flex-row items-start gap-4 xl:gap-2.5 w-full pb-12 border-b px-5 border-black/40">
     <div className=" w-full xl:w-[25%]   flex flex-col gap-0.5">
     <h2 className=" font-medium  text-base sm:text-lg xl:text-[20px]">Programs Basics</h2>
     <p className=" text-xs sm:text-sm  text-black/50  leading-[21px]">Tell us about your cause and what you're raising funds for.</p> 
     </div>
     <div className=" w-full xl:w-[75%] grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4 ">
     <div className=' sm:col-span-2'>
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



     {/* Story basic  */}
    <div className=" flex flex-col xl:flex-row items-start gap-4 xl:gap-2.5  w-full pb-6 border-b px-5 border-black/40">
     <div className=" w-full xl:w-[25%]   flex flex-col gap-0.5">
     <h2 className=" font-medium  text-base sm:text-lg xl:text-[20px]">Story</h2>
     <p className="  text-xs sm:text-sm  text-black/50 leading-[21px]">Tell your story. Inspire people to care and contribute.</p>
        
     </div>
     <div className=" w-full xl:w-[75%] grid  grid-cols-1 gap-5 sm:gap-4 ">
       <ErrorBoundary>
            <Editor
              content={formData.description}
              setContent={(value) =>
                setFormData((prev) => ({ ...prev, description: value }))
                
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
      gallery: images,
    }));
  }}
  error={errors.gallery}
/>

    
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
          {patchLoading ? <SubmitLoading size={12} /> : 'Update Program'}

        </button>


      
      </div>
    
    </div>
  )
}

export default ProgramsForm



