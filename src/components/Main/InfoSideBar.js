
import ImageWithFallback from "../ImageFallback"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tmdbBasicImg } from "../values"
import Link from "next/link"
import { IoClose } from "react-icons/io5";



export function InfoSideBar({data,mediatype,season,id ,showInfo,setshowInfo,setSeason}) {
  return (
    <div className={` h-full col-span-2 noscb overflow-y-auto bg-bgDark rounded-2xl relative ${showInfo?'right-0 w-2/5':"right-[-100%] w-0"} transition-[left] duration-300`}>
        <div className="w-full px-4 py-4 pt-0 flex flex-col gap-4 ">
          <div className="w-full flex items-center px-2 justify-between sticky top-0 left-0 z-[4] py-4 pb-2 bg-gradient-to-b from-bgDark via-bgDark to-bgdark/60 ">
            <div className=" flex items-center font-medium text-textSec text-[1rem]">
              {data?.results?.title ||
                data?.results?.original_title ||
                data?.results?.name ||
                data?.results?.original_name ||
                "Title"}
            </div>
            <div className="p-1 text-white/40 text-3xl" onClick={()=>{setshowInfo(false)}}>
            <IoClose />
            </div>
          </div>
          {mediatype == "tv" && (
            <div className="w-full flex flex-col gap-2">
              <div className="w-full ">
                <Select onValueChange={(e)=>{
                  setSeason(e)
                }}
                  defaultValue={season.toString()}
                >
                  <SelectTrigger className="w-full border-none bg-bgDark2 text-textWhite">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent className="bg-bgDark2/50 backdrop-blur-xl text-textWhite outline-none border-none ">
                    {data?.results?.seasons?.map((e, i) => (
                      <Link className="w-full" 
                        key={"seasonSelect" + i}
                      href={`/watch/${mediatype}/${id}/${e?.season_number}`}>
                      <SelectItem
                      value={e?.season_number.toString()}
                      >
                        {e?.name}
                      </SelectItem>
                        </Link>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full max-h-[50vh] rounded-2xl  overflow-y-auto noscb flex flex-col">
                <div className="w-full h-full grid grid-cols-2 gap-1">
                  {data?.results?.seasonInfo?.find(e=>e?.season_number==season)?.episodes?.map((e, i) => (
                    <Link href={`/watch/${mediatype}/${id}/${season}/${e?.episode_number}`}
                      key={"season" + i}
                      className="overflow-hidden w-full rounded-xl aspect-video bg-bgDark3 relative group"
                    >
                      <div className="w-full h-full from-black/10  via-black/60 to-black/90 text-textSec text-xs flex justify-start transition-all duration-200 items-end text-wrap p-2 group-hover:opacity-100 opacity-0 bg-gradient-to-b absolute top-0 left-0 z-[3] rounded-xl">{
                        e?.name
                      }</div>
                      <div className="absolute bottom-0 right-0 px-2 py-1 bg-black/70 rounded-tl-xl text-textWhite text-sm font-medium  transition-all duration-200 opacity-100 group-hover:opacity-0">
                        Ep {e?.episode_number}
                      </div>
                      <ImageWithFallback
                        width="300" key={e?.still_path}
                        className="w-full h-full object-cover"
                        height="300"
                        src={tmdbBasicImg + "/w300/" + e?.still_path}
                      />
                    </Link>
                  ))}
                </div>
              </div>
              <div className="w-full px-4 py-2">

              <div className=" w-full h-[3px] rounded-full bg-bgDark3"></div>
              </div>
            </div>
          )}

          <div className="w-full flex gap-6">
            <div className="w-[50%] aspect-[3/4] rounded-xl overflow-hidden">
              <ImageWithFallback
                width="780"
                height="500"
                // alt="backdrop"
                src={tmdbBasicImg + "w780" + data?.results?.poster_path}
                alt="Poster"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col h-full text-textWhite text-[1rem] gap-2 justify-center">
              <div className="flex flex-col ">
                <div className="text-textSec">Status:</div>
                <div className="">{data?.results?.status}</div>
              </div>
              <div className="flex flex-col ">
                <div className="text-textSec">Production:</div>
                <div className="">
                  {data?.results?.production_companies?.[0]?.name}
                </div>
              </div>
              <div className="flex flex-col ">
                <div className="text-textSec">Aired:</div>
                <div className="">{data?.results?.release_date}</div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="w-full text-2xl text-white font-medium">
              {data?.results?.title ||
                data?.results?.original_title ||
                data?.results?.name ||
                data?.results?.original_name ||
                "Title"}
            </div>
            <div className="w-full p-3 text-sm bg-bgDark2 rounded-xl text-textSec font-medium">
              {data?.results?.overview}
            </div>
            <div className="w-full flex gap-2 items-center flex-wrap ">
              {data?.results?.genres?.map((e, i) => (
                <div
                  className="text-sm px-3 h-fit py-2 w-fit rounded-lg bg-bgDark3 text-textSec whitespace-nowrap"
                  key={i + "genre"}
                >
                  {e?.name}
                </div>
              ))}
            </div>
          </div>
          <div className="text-xl text-textWhite">Characters</div>
          <div className="w-full max-h-[40vh] overflow-y-auto noscb grid grid-cols-1 gap-2 rounded-xl">
            {data?.results?.cast?.map((e, i) => (
              <div
                key={"Charatcer" + e?.id + "_" + i}
                className="w-full h-fit px-4 py-3 bg-bgDark2/40 rounded-xl flex gap-4 items-center text-textSec "
              >
                <div className="w-12 aspect-square rounded-full bg-bgDark3 overflow-hidden">
                  <ImageWithFallback
                    width="45"
                    height="45"
                    src={tmdbBasicImg + "/w45/" + e?.profile_path}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-[1rem] font-medium">{e?.name}</div>
                  <div className="text-sm">{e?.character}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> 
  )
}
