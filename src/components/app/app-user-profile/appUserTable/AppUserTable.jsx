import { use, useState } from "react";
import AppDonarsTable  from './AppDonarsTable';
import ImpactAppUserTable from './ImpactAppUserTable';
import AppUserWishesList  from './AppUserWishesList';
import AppUserEventTable   from './AppUserEventTable';
import Axios from '../../../../config/api';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { setStats as setPostStats } 
  from '../../../../redux/slices/postSlice';
  import { setStats as setEventRegistrationStats } 
  from '../../../../redux/slices/eventRegistrationSlice';
import { setStats } from '../../../../redux/slices/donationSlice';
import { useParams } from 'react-router-dom';
import DisplayError from '../../../../components/global/DisplayError';
import ItemNotFound from '../../../../components/global/ItemNotFound';
import Loader from '../../../../components/global/Loader';
import devLog from "../../../../utils/logsHelper";



const AppUserTable = () => {
      const [active, setActive] = useState("Donors");
const {id}=useParams();


 
//current 
const [donationCurrentPage, setDonationCurrentPage] = useState(1);
const [donationLimit, setDonationLimit] = useState(10);

//post
const [postCurrentPage, setPostCurrentPage] = useState(1);
const [postLimit, setPostLimit] = useState(10);

// joint event 

const [eventCurrentPage, setEventCurrentPage] = useState(1);
const [eventLimit, setEventLimit] = useState(10);





 const  dispatch=useDispatch();

        const stats = [
    { label: "Donors", },
      { label: "Join Events", },
    { label: "Post",  },

  ];


  // donation by user   
const queryKey = [
  'fetch-donation-by-user',
  id,
  donationCurrentPage,
  donationLimit,
];

const {
  isLoading: donationLoading,
  isError: donationIsError,
  error: donationError,
} = useQuery(
  queryKey,
  () => {
    const url = `/donation?donorUser=${id}&pageSize=${donationLimit}&page=${donationCurrentPage}&sortBy=createdAt_descending`;
    return Axios.get(url);
  },
  {
    enabled: !!id,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      const {
        data: {
          data: { docs, pages, docsCount, page },
        },
      } = response;

      dispatch(setStats({ docs, pages, docsCount, page }));
    },
  }
);




const postQueryKey = [
  'posts-by-user',
  id,
  postCurrentPage,
  postLimit,
];

const {
  isLoading: postLoading,
  isError: postIsError,
  error: postError,
} = useQuery(
  postQueryKey,
  () => {
    const url = `/admin/post/?userObjectId=${id}&pageSize=${postLimit}&page=${postCurrentPage}&sortBy=createdAt_descending`;
    return Axios.get(url);
  },
  {
    enabled: !!id,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      const {
        data: {
          data: { docs, pages, docsCount, page },
        },
      } = response;

      dispatch(setPostStats({ docs, pages, docsCount, page }));
    },
  }
);


///event  fetc  

const eventRegistrationQueryKey = [
  'event-registrations-by-user',
  id,
  eventCurrentPage,
  eventLimit,
];

const {
  isLoading: eventLoading,
  isError: eventIsError,
  error: eventError,
} = useQuery(
  eventRegistrationQueryKey,
  () =>
    Axios.get(
      `/event/registrations?userId=${id}&pageSize=${eventLimit}&page=${eventCurrentPage}`
    ),
  {
    enabled: !!id,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
      const { docs, pages, docsCount, page } =
        response.data.data;

      dispatch(
        setEventRegistrationStats({
          docs,
          pages,
          docsCount,
          page,
        })
      );
    },
  }
);
  

  return (
    <div  className=" flex flex-col gap-2.5">
    <div className=' flex flex-col gap-2.5 lg:flex-row lg:justify-between lg:items-center w-full'>
 

        <div className="flex gap-5 bg-white  rounded-[8px] px-5 py-2.5 w-full flex-wrap lg:w-fit  cursor-pointer   order-2  lg:order-1">
      {stats.map((item) => {
        const isActive = active === item.label;

        return (
          <div
            key={item.label}
            onClick={() => setActive(item.label)}
            className={`
              flex gap-1.5 items-center
              rounded-[8px] px-2 py-1.5 w-fit cursor-pointer
              ${isActive ? "bg-[#B6E2E2] text-black" : "bg-white text-black"}
              transition-all duration-300
            `}
          >
            <p className="text-sm font-medium">{item.label}</p>
           
          </div>
        );
      })}
    </div>



    </div>
    {
      active ==='Donors' && (
          <AppDonarsTable  
           
                 currentPage={donationCurrentPage}
            setCurrentPage={setDonationCurrentPage}
                limit={donationLimit}
                  setLimit={setDonationLimit}
               isLoading={eventLoading} 
               isError={donationIsError}
                error={eventError}


          />
      )
    }



 {
      active ==='Join Events' && (
         <AppUserEventTable
       

              currentPage={eventCurrentPage}
            setCurrentPage={setEventCurrentPage}
                limit={eventLimit}
                  eventLimit={setEventLimit}
               isLoading={donationLoading} 
               isError={eventIsError}
                error={donationError}
          

         />
      )
    }


     {
      active ==='Post' && (
          <AppUserWishesList

                  currentPage={postCurrentPage}
            setCurrentPage={setPostCurrentPage}
                limit={postLimit}
                  setLimit={setPostLimit}
               isLoading={postLoading} 
               isError={postIsError}
                error={postError}

          />
      )
    }
    

   
   
   

    </div>
  )
}

export default AppUserTable