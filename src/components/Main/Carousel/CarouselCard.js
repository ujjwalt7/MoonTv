import { addToWatchlistHandler, tmdbBasicImg } from "@/components/values";
import { IoIosAdd } from "react-icons/io";
import { TiStarFullOutline } from "react-icons/ti";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import ImageWithFallback from "@/components/ImageFallback";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";
function CarouselCard({ e }) {
  const {toast} = useToast();
  const { user,setUser } = useUser();
  return (
    <div className="w-full">
      <div className=" w-full md:aspect-[10/3] aspect-[9/6] rounded-3xl overflow-hidden blur-0 relative">
        <div className="w-full h-full overflow-hidden z-[2]">
          <ImageWithFallback width="1280" height="720"
            src={tmdbBasicImg + "w1280" + e?.backdrop_path}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="w-full z-[3] absolute top-0 left-0 h-full md:bg-black/10 bg-gradient-to-b from-black/0 to-black  md:backdrop-blur-md grid md:grid-cols-2 grid-cols-1 ">
          <div className="w-full h-full flex flex-col md:justify-center justify-end py-4 md:px-10 px-5 md:gap-4 gap-2">
            {e?.logo !=null?(<div className="md:w-full w-2/3 md:h-[13vh] h-12 overflow-hidden flex justify-start items-center">
              <ImageWithFallback width="500" height="500"
                src={tmdbBasicImg + "w500/" + e?.logo?.file_path}
                className="object-contain overflow-hidden h-full w-fit "
                alt=""
              />
            </div>):(
              <div className="md:text-5xl text-2xl text-textWhite font-medium">
                  {e?.title || e?.original_title||e?.name||e?.original_name}</div>
            )}
            <div className="w-full flex flex-col md:gap-2 gap-1">
              <div className="w-full flex gap-5 text-textWhite items-center text-xs md:text-[1rem]">
                <div className="font-medium capitalize">{e?.media_type}</div>
                <div className="font-medium capitalize">
                  {e?.release_date?.substring(0, 4) ||
                    e?.first_air_date?.substring(0, 4)}
                </div>
                <div className="flex items-center gap-1">
                  <div className="text-lg">
                    <TiStarFullOutline />
                  </div>
                  {e?.vote_average?.toString()?.substring(0, 3)}
                </div>
              </div>
              <div className="md:w-full w-4/5 md:text-textWhite text-textWhite/80 md:text-sm text-xs">
                {e?.overview?.substring(0, 200) + "..."}
              </div>
              <div className="w-full flex items-center gap-2 md:text-[1rem] text-xs">
                <Link href={`${"/watch/"+e?.media_type+"/"+e?.id}`} className="px-4 py-3 rounded-full text-textWhite text-sm bg-white/10 font-medium flex items-center gap-3 backdrop-blur-xl">
                  <div className="md:text-lg text-sm">
                    <FaPlay />
                  </div>
                  Watch Now
                </Link>
                <div className="p-2 cursor-pointer bg-white/10 text-textWhite backdrop-blur-xl text-2xl rounded-full overflow-hidden" onClick={()=>{
                  addToWatchlistHandler({user,movieId: e?.id,movieType: e?.media_type,setUser,toast});
                }}><IoIosAdd /></div>
              </div>
            </div>
          </div>
          <div className="w-full justify-center items-center overflow-hidden md:flex hidden">
            <div className="w-1/2">
              <ImageWithFallback width="780" height="500"
                src={tmdbBasicImg + "w780" + e?.poster_path}
                className="w-full -skew-x-6"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarouselCard;
