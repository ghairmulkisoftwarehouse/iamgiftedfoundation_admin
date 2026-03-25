// import moment from "moment";
import { baseURL } from '../../../../config/api';
import img from '../../../../assets/images/img1.jpg';




const TeamCard = ({doc,width='max-w-sm'}) => {
//   const formattedDate = moment(doc?.createdAt).format("MMM DD, YYYY HH:mm");

  return (
    <div className={` ${width} border rounded-lg shadow-lg p-4 bg-white`}>
      {/* Logo */}
      <div className="flex flex-row gap-2 w-full mb-1">
        <div className="flex-shrink-0">
        <div className="w-[50px] h-[50px] overflow-hidden  rounded-full  ">
          <img 
        src={doc?.image?.relativeAddress ? `${baseURL}/${doc?.image?.relativeAddress }` : img}
            alt={doc?.title} 
            className=" w-full h-full  object-cover"
          />

        </div>
        
        </div>

        <div className="flex flex-col gap-0.5">
          <p className="text-gray-600 text-sm">{doc?.designation}</p>
          <h2 className="text-base md:text-lg font-semibold">{doc?.title}</h2>
        </div>
      </div>

      
    </div>
  );
};

export default TeamCard;
