import TopNav from "@/components/topNav";
import { IoAddCircleOutline } from "react-icons/io5";
import { tags, tmdbBasicImg } from "@/components/values";
import { GrFavorite } from "react-icons/gr";
import { useRouter } from "next/router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import CardofCarouselMainCard from "@/components/Main/Cards/CardofCarouselMainCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState,useRef,useEffect } from "react";
import Image from "next/image";
import ImageWithFallback from "@/components/ImageFallback";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
export const getServerSideProps = async (context) => {
  try {
    const mediatype = context.query.watch[0] || "movie";
    const id = context.query.watch[1];
    const datares = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/getbyid?type=${mediatype}&id=${id}`
    );
    const data = await datares.json();
    return { props: { data } };
  } catch (error) {
    console.error("Fetch error:", error);
    return { props: { data: null } }; // Fallback in case of error
  }
};

function WatchPage({ data }) {
  const [capi, setCarouselApi] = useState();
  const router = useRouter();
  const getDefSeason = router.query?.watch?.[2] || 1;
  const mediatype = router.query.watch[0];
  const [season,setSeason] = useState(router.query?.watch?.[2] || 1);
  const episode = router.query?.watch?.[3] || 1;
  const id = router.query.watch[1];
  const bgImgBlur = data?.results?.backdrop_path;

  const onPlayCLick = ()=>{}


  return (
    <div className="w-full grid grid-cols-7 h-full  gap-2">
      <div className="w-full h-full col-span-5 bg-bgDark  overflow-hidden rounded-2xl">
        <div className="w-full h-full relative overflow-y-auto noscb">
          <div className="w-full h-[100%] absolute top-0 left-0 z-[0] rounded-2xl overflow-hidden">
            <ImageWithFallback
              alt="Poster"
              width={300}
              height={300}
              src={tmdbBasicImg + "w300/" + bgImgBlur}
              className="w-full h-[50vh] bg-bgDark3 blur-3xl transition-all duration-300 ease-in-out"
            />
          </div>
          <div className="w-full  flex flex-col gap-4 blur-0" id="scroll">
            <TopNav
              title={
                data?.results?.title ||
                data?.results?.original_title ||
                data?.results?.name ||
                data?.results?.original_name ||
                "Title"
              }
            />
            <div className="w-full px-8 pt-4">
              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-bgDark/30">
                <iframe 
                  src={`https://embed.su/embed/${mediatype}/${id}${
                    mediatype == "tv" ? `/${getDefSeason}/${episode}` : ""
                  }`}
                  className="w-full h-full"
                  allowFullScreen onClick={onPlayCLick}
                  frameBorder="0"
                ></iframe>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2 px-8">
              <div className="w-full px-2 flex justify-start items-center">
                <div className="w-full flex gap-2 items-center text-textWhite">
                  <div className="text-xl font-medium">
                    {data?.results?.title ||
                      data?.results?.original_title ||
                      data?.results?.name ||
                      data?.results?.original_name ||
                      "Title"}
                  </div>
                  {data?.results?.tagline !== "" && (
                    <div className="text-sm">- {data?.results?.tagline}</div>
                  )}
                </div>
              </div>

              <div className="w-full flex justify-end items-center">
                <div className="flex items-center gap-1 bg-bgDark2 text-textSec rounded-lg px-3 py-2 text-sm">
                  <div className="text-2xl">
                    <IoAddCircleOutline />
                  </div>
                  Add to Watchlist
                </div>
              </div>
              <div className="w-full flex flex-col gap-2 pt-4">
                <div className="w-full text-lg text-textSec font-medium">
                  Related Videos
                </div>
                {/* <div className="w-full grid grid-cols-4 gap-2"> */}

                <Carousel
                  opts={{
                    align: "start",
                  }}
                >
                  <CarouselContent>
                    {data?.results?.videos?.map((e, i) => (
                      <CarouselItem
                        key={e?.id + "_RelatedVideos"}
                        className="basis-1/4 relative w-full flex flex-col"
                      >
                        <div className="w-full absolute top-0 left-0 h-full bg-gradient-to-b from-bgDark/0  to-black  rounded-xl overflow-hidden flex justify-start items-end text-xs text-textWhite px-4 py-2">
                          {e?.name}
                        </div>
                        <div className="w-full aspect-video rounded-xl bg-bgDark3 overflow-hidden">
                          <ImageWithFallback
                            src={
                              tmdbBasicImg +
                              "/w300" +
                              data?.results?.backdrop_path
                            }
                            width="300"
                            height="300"
                            alt="backdrop"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                {/* </div> */}
              </div>
              <div className="w-full flex flex-col gap-2 pt-8">
                <div className="w-full flex justify-between items-center">
                  <div className="w-full text-lg text-textSec font-medium">
                    Recommended
                  </div>
                  <div className="flex w-fit bg-bgDark2/40 backdrop-blur-lg  rounded-lg overflow-hidden">
                    <div
                      className={`p-2 text-xl text-textSec`}
                      onClick={() => {
                        capi.scrollPrev();
                      }}
                    >
                      <IoIosArrowBack />
                    </div>
                    <div
                      className={`w-[2px] self-stretch my-[5px] bg-textSec/40`}
                    ></div>
                    <div
                      onClick={() => {
                        capi.scrollNext();
                      }}
                      className="p-2 text-xl text-textSec"
                    >
                      <IoIosArrowForward />
                    </div>
                  </div>
                </div>
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  setApi={setCarouselApi}
                >
                  <CarouselContent className="py-6 pb-20">
                    {data?.results?.recommended?.map((e, i) => (
                      <CarouselItem
                        key={"CarouselCardMain" + i}
                        className="basis-52 pl-3"
                      >
                        <CardofCarouselMainCard data={e} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full  h-full col-span-2 noscb overflow-y-auto bg-bgDark rounded-2xl">
        <div className="w-full px-4 py-4 flex flex-col gap-4 ">
          <div className="w-full flex items-center px-2 justify-start">
            <div className=" flex items-center font-medium text-textSec text-[1rem]">
              {data?.results?.title ||
                data?.results?.original_title ||
                data?.results?.name ||
                data?.results?.original_name ||
                "Title"}
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
                    {data?.results?.seasons.map((e, i) => (
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
                      className="overflow-hidden w-full rounded-xl aspect-video bg-bgDark3 relative"
                    >
                      <div className="absolute bottom-0 right-0 px-2 py-1 bg-black/70 rounded-tl-xl text-textWhite text-sm font-medium ">
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
    </div>
  );
}

export default WatchPage;
