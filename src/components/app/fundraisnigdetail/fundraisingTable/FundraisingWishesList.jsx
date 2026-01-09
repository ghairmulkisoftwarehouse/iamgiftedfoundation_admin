import imgwish from '../../../../assets/images/wishes.png';
import { FaHeart } from "react-icons/fa";
import { LuReply } from "react-icons/lu";

const wishesData = [
  {
    name: "Junaid",
    time: "1 minute ago",
    message:
      "With this scholarship, we believe in your abilities and dreams. May you find the strength and determination to achieve everything you set your heart on.",
    likes: 15,
  },
  {
    name: "Ayesha",
    time: "5 minutes ago",
    message:
      "Keep pushing forward! Your dedication is inspiring and we are here to support your journey.",
    likes: 8,
  },
  {
    name: "Ali",
    time: "10 minutes ago",
    message:
      "Wishing you success in every step of your education. Stay strong and motivated!",
    likes: 12,
  },
  {
    name: "Sara",
    time: "20 minutes ago",
    message:
      "May this opportunity open doors to achieve your dreams and reach your full potential.",
    likes: 20,
  },
  {
    name: "Hassan",
    time: "30 minutes ago",
    message:
      "Believe in yourself and your abilities. We are cheering for you every step of the way!",
    likes: 10,
  },
];

const FundraisingWishesList = () => {
  return (
    <div className="flex flex-col gap-4">
      {wishesData.map((wish, index) => (
        <div
          key={index}
          className="bg-white rounded-[8px] py-4 flex flex-col gap-3 px-3.5"
        >
          {/* Header */}
          <div className="flex flex-row gap-1.5">
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex-shrink-0">
              <img
                src={imgwish}
                alt="img"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <h2 className="text-[15px] font-medium">{wish.name}</h2>
              <p className="text-black/60 text-xs">{wish.time}</p>
            </div>
          </div>

          {/* Message */}
          <div>
            <p className="text-black/80 text-xs break-words whitespace-normal">
              {wish.message}
            </p>
          </div>

          {/* Likes info */}
          <div className="text-xs border-b border-black/30 pb-3.5">
            <span className="font-medium">{wish.likes} people</span>{" "}
            <span className="text-black/70">loved this wish</span>
          </div>

          {/* Actions */}
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-1">
              <span className="text-[#B22222]">
                <FaHeart />
              </span>
              <span className="text-xs">{wish.likes} Liked</span>
            </div>

            <div className="flex items-center gap-1">
              <span>
                <LuReply />
              </span>
              <span className="text-xs">Reply</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FundraisingWishesList;
