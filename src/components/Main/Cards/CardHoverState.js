import ImageWithFallback from "@/components/ImageFallback";
import { addToWatchlistHandler, tmdbBasicImg } from "@/components/values";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";
import { HoverCardContent } from "@radix-ui/react-hover-card";
import Image from "next/image";
import { FaPlay } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";

function CardHoverState({ data }) {
  const {toast} = useToast();
  const { user,setUser } = useUser();
  const handleButtonClick = (e) => {
    e.stopPropagation(); addToWatchlistHandler({user,movieId: data?.id,movieType: data?.media_type,setUser,toast});
  };
    return (
        //w-[125%] h-fit  absolute -top-[5%] left-[103%] bg-bg/40 backdrop-blur-xl rounded-2xl group-hover:z-[4] z-[2]  group-hover:opacity-100 opacity-0 invisible group-hover:visible transition-[opacity] ease-in-out duration-700
        <div className="w-full bg-bg/40 backdrop-blur-xl rounded-2xl overflow-hidden ">
    {/* <div className=""> */}
      <div className="w-full h-full flex flex-col rounded-2xl overflow-hidden">
        <div className="w-full h-full flex flex-col gap-1">
          <div className="w-full h-[15vh]">
            <ImageWithFallback width="300" height="500"
              src={tmdbBasicImg + "w780/" + data?.backdrop_path}
              className="w-full h-full object-cover "
              alt="BackDrop"
            />
          </div>
          <div className="w-full h-full flex flex-col p-2 justify-between gap-2">
            <div className="w-full flex flex-col gap-0">
              <div className="w-full font-medium text-textWhite">
                {data?.title ||
                  data?.original_title ||
                  data?.name ||
                  data?.original_name}
              </div>
              <div className="text-xs text-textSec">
                {data?.overview?.substring(0, 60) + "...."}
              </div>
            </div>
            <div className="w-full flex flex-col text-xs gap-1 text-[#ccc]">
              <div className="w-full flex gap-2">
                <div className="font-medium">Date: </div>
                <div className="">
                  {data?.release_date || data?.first_air_date}
                </div>
              </div>
              <div className="w-full flex gap-2">
                <div className="font-medium">Type: </div>
                <div className="capitalize">{data?.media_type}</div>
              </div>
              <div className="w-full flex gap-2 ">
                <div className="font-medium">Lang: </div>
                <div className="uppercase">{data?.original_language}</div>
              </div>
            </div>
            <div className="w-full flex items-center gap-2">
              <div className="w-full bg-white/20 text-textWhite rounded-xl px-4 gap-2 backdrop-blur-lg py-2 text-center items-center flex justify-center">
                <div className="text-lg">
                  <FaPlay />
                </div>
                Watch Now
              </div>
              <div className="p-2 cursor-pointer text-2xl bg-white/20 text-textWhite rounded-full backdrop-blur-lg"  onClick={handleButtonClick}>
                <IoIosAdd />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardHoverState;
