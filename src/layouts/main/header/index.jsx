import React, { memo,useState,useEffect } from 'react'
import  LanguageSvg  from '../../../assets/svgs/LanguageSvg';
import CommentSvg   from '../../../assets/svgs/CommentSvg';
import  NotificationSvg   from '../../../assets/svgs/NotificationSvg';
import { FaBars } from "react-icons/fa6";
import Notifcation   from './Notifcation';
import Usermenu  from './UserMenu';
import { usePannelContext } from '../../../context/PannelContext';
import formatLabel from '../../../utils/formatLabel';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import Axios from '../../../config/api';
import { setProfile } from '../../../redux/slices/profileSlice';
import { useDispatch,useSelector } from 'react-redux';
import devLog from '../../../utils/logsHelper';
import { baseURL } from '../../../config/api';
import  img from '../../../assets/images/img1.jpg';
import { ClipLoader } from 'react-spinners'; 




const Header = () => {
      const location = useLocation();

     const {  setShowPannel } = usePannelContext();
           const [scrolled, setScrolled] = useState(false);

   const  dispatch=useDispatch();
    const { doc } = useSelector((state) => state.profile);
   devLog(' this is a profile  doc',doc)

       const pathSegments = location.pathname.split('/'); // ['', 'app', 'dashboard']
  let heading = '';
  if (pathSegments[1] === 'app' && pathSegments[2]) {
    heading = pathSegments[2].charAt(0).toUpperCase() + pathSegments[2].slice(1); // Capitalize first letter
  }



    useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const { data, isLoading, error } = useQuery(
    ['my-profile'],
    async () => {
      const res = await Axios.get('/user/my-profile');
      return res.data;
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        dispatch(setProfile(res?.data));
      },
    }
  );



  
  const fullname =  doc?.profile?.fullName || doc?.doc?.username  ;
    const email =  doc?.doc?.email;
  const myrole =  doc?.doc?.roles?.[0];
  const profileImage = doc?.doc?.image ? `${baseURL}/${doc?.doc?.image?.relativeAddress}` : img;





    return (
        <div className='   fixed top-0 left-0 w-full h-[70px]    lg:pl-[250px]   z-10            '>
     <div
  className={`px-4 flex items-center justify-between w-full h-full bg-white ${
    scrolled ? 'lg:bg-white' : 'lg:bg-transparent'
  }`}
>


             <div 
      onClick={() => setShowPannel(true)}
   className="block lg:hidden text-2xl cursor-pointer">
          <FaBars />
        </div>

       {heading && (
        <div className="flex items-center min-w-0 hidden lg:block">
          <span className="inline-block ml-2 text-[20px] sm:text-[22px] md:text-2xl lg:text-[26px] text-[#1A1C1E] font-semibold truncate">
            {formatLabel(heading)}
          </span>
        </div>
      )}

    <div className=' flex flex-row gap-4'>
     <div  className=' flex flex-row items-center gap-2 cursor-pointer'>
     <div className="w-[39px] h-[39px] rounded-full p-[2px] bg-white">
  <div
    className="
      w-full h-full rounded-full
      bg-gradient-to-br
      from-[rgba(227,248,237,0.8)]
      to-transparent
       flex justify-center items-center
    "
  >
   <LanguageSvg/>
  </div>
 
</div>

    <div className="w-[39px] h-[39px] rounded-full p-[2px]    bg-white">
  <div
    className="
      w-full h-full rounded-full
      bg-gradient-to-br
      from-[rgba(227,248,237,0.8)]
      to-transparent
       flex justify-center items-center
    "
  >
   <CommentSvg/>
  </div>
 
</div>


 <Notifcation/>



      </div>
    {isLoading ? (
            <ClipLoader size={16}  color='#000000'  />
          ) : (
            <Usermenu fullname={fullname} role={myrole} profileImage={profileImage} email={email} />
          )}

    </div>

          </div>


     

        </div>
    )
}

export default memo(Header) 