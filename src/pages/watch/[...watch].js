import TopNav from "@/components/topNav";
import { IoAddCircleOutline } from "react-icons/io5";
import {
  addToWatchHistoryHandler,
  tags,
  tmdbBasicImg,
} from "@/components/values";
import { GrFavorite } from "react-icons/gr";
import { useRouter } from "next/router";
import { ANIME, MOVIES } from "@consumet/extensions";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import CardofCarouselMainCard from "@/components/Main/Cards/CardofCarouselMainCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
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
import { useUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";
import { InfoSideBar } from "@/components/Main/InfoSideBar";
import { Skeleton } from "@/components/ui/skeleton";
export const getServerSideProps = async (context) => {
  try {
    const mediatype = context.query.watch[0] || "movie";
    const id = context.query.watch[1];
    const datares = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/getbyid?type=${mediatype}&id=${id}`
    );
    const data = await datares.json();

    // const ms = movies.

    return { props: { data } };
  } catch (error) {
    console.error("Fetch error:", error);
    return { props: { data: null } }; // Fallback in case of error
  }
};

function WatchPage({ data }) {
  const [capi, setCarouselApi] = useState();
  const router = useRouter();
  const getDefSeason = router?.query?.watch?.[2] || 1;
  const mediatype = router?.query?.watch?.[0];
  const [season, setSeason] = useState(router?.query?.watch?.[2] || 1);
  const [episode,setEpisode] = useState(router?.query?.watch?.[3] || 1);
  const id = router?.query?.watch?.[1];
  const bgImgBlur = data?.results?.backdrop_path;

  const { toast } = useToast();
  const { user, setUser } = useUser();
  const [showInfo, setshowInfo] = useState(true);
  const [selectedServer, setSelectedServer] = useState("0");

  // useEffect(() => {
  //   setServer(serverIframeChanger(selectedServer));
  // }, [id, season, episode,selectedServer]);
  useEffect(() => {
    setSeason(router?.query?.watch?.[2] || 1);
    setEpisode(router?.query?.watch?.[3] || 1);
  }, [router?.query?.watch]);
  useEffect(() => {
    setServer(serverIframeChanger(selectedServer, season, episode));
  }, [selectedServer, season, episode]);

  const serverIframeChanger = (val,currentSeason = season,currentEpisode = episode) => {
    switch (val) {
      case "0" || 0:
        return `https://player.videasy.net/${
          mediatype == "tv"
            ? "tv/" + id + "/" + currentSeason + "/" + currentEpisode
            : "movie/" + id
        }`;
        break;
      case "1" || 1:
        return `https://embed.su/embed/${mediatype}/${id}${
          mediatype == "tv" ? `/${currentSeason}/${currentEpisode}` : ""
        }`;
        break;
      case "2" || 2:
        return `https://player.autoembed.cc/embed/${
          mediatype == "tv"
            ? "tv/" + id + "/" + currentSeason + "/" + currentEpisode
            : "movie/" + id
        }`;
        break;
      case "3" || 3:
        return `https://vidbinge.dev/embed/${
          mediatype == "tv"
            ? "tv/" + id + "/" + currentSeason + "/" + currentEpisode
            : "movie/" + id
        }`;
        break;
      default:
        return `https://embed.su/embed/${mediatype}/${id}${
          mediatype == "tv" ? `/${currentSeason}/${currentEpisode}` : ""
        }`;
    }
  };
  const [server, setServer] = useState(serverIframeChanger("0"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // minimum 0.25s
    return () => clearTimeout(timer);
  }, [data]);

  if (loading) {
    // Skeleton replica
    return (
      <div className="w-full flex h-full gap-2 overflow-x-hidden">
        <div className="w-full h-full relative bg-bgDark overflow-x-hidden overflow-hidden rounded-2xl transition-all duration-500">
          <div className="w-full h-full relative overflow-y-auto overflow-x-hidden noscb">
            <div className="w-full h-[100%] absolute top-0 left-0 z-[0] rounded-2xl overflow-hidden">
              <Skeleton className="w-full h-[50vh] bg-bgDark3 blur-3xl" />
            </div>
            <div className="w-full flex flex-col gap-4 blur-0" id="scroll">
              <Skeleton className="h-12 w-1/3 mx-8 my-6 rounded-lg" />
              <div className="w-full px-8 pt-4">
                <Skeleton className="w-full aspect-video rounded-2xl bg-bgDark/30" />
              </div>
              <div className="w-full flex flex-col gap-2 px-8">
                <div className="w-full px-2 flex justify-between items-center">
                  <div className="w-full flex gap-2 items-center">
                    <Skeleton className="h-8 w-48 rounded-lg" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-24 rounded-lg" />
                  </div>
                </div>
                <div className="w-full flex justify-end items-center">
                  <Skeleton className="h-10 w-40 rounded-lg" />
                </div>
                <div className="w-full flex flex-col gap-2 pt-4">
                  <Skeleton className="h-8 w-32 rounded-lg" />
                  <div className="w-full grid grid-cols-4 gap-2">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="aspect-video rounded-xl" />
                    ))}
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2 pt-8">
                  <div className="w-full flex justify-between items-center">
                    <Skeleton className="h-8 w-32 rounded-lg" />
                    <div className="flex w-fit gap-2">
                      <Skeleton className="h-8 w-8 rounded-lg" />
                      <Skeleton className="h-8 w-2 rounded-lg" />
                      <Skeleton className="h-8 w-8 rounded-lg" />
                    </div>
                  </div>
                  <div className="w-full flex gap-2 py-6 pb-20">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="basis-52 h-72 rounded-xl" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Sidebar skeleton */}
        <div className="hidden md:block w-96 h-full bg-bgDark2 rounded-2xl ml-2">
          <Skeleton className="w-full h-full rounded-2xl" />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex h-full  gap-2 overflow-x-hidden">
      {/* <div className="w-full flex h-full  gap-2"> */}
      <div className="w-full h-full relative  bg-bgDark overflow-x-hidden  overflow-hidden rounded-2xl transition-all duration-500">
        {!showInfo && (
          <div
            onClick={() => setshowInfo(true)}
            className="w-[2%] text-4xl opacity-0 hover:opacity-100 flex justify-center items-center hover:w-[5%] transition-all duration-300 z-[5] bg-gradient-to-r hover:from-bgDark/20 hover:to-bg h-full fixed right-0 top-0"
          >
            <IoIosArrowForward />
          </div>
        )}

        <div className="w-full h-full relative overflow-y-auto overflow-x-hidden noscb">
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
                  // src={`https://embed.su/embed/${mediatype}/${id}${
                  //   mediatype == "tv" ? `/${getDefSeason}/${episode}` : ""
                  // }`}
                  src={server}
                  className="w-full h-full"
                  allowFullScreen
                  key={`${id}-${season}-${episode}`}
                  onClick={() => {
                    console.log("Played");
                    addToWatchHistoryHandler({
                      user,
                      movieId: data?.results?.id,
                      mediaType: data?.results?.media_type,
                      setUser,
                      toast,
                    });
                  }}
                  frameBorder="0"
                ></iframe>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2 px-8">
              <div className="w-full px-2 flex justify-between items-center">
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
                <div className="flex items-center gap-2">
                  <div className="text-sm">Server:</div>
                  <Select
                     onValueChange={(e) => setSelectedServer(e)}
                    defaultValue="0"
                  >
                    <SelectTrigger className="w-full border-none bg-bgDark2 text-textWhite">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent className="bg-bgDark2/50 backdrop-blur-xl text-textWhite outline-none border-none ">
                      <SelectItem value="0">Default</SelectItem>
                      <SelectItem value="1">Primary</SelectItem>
                      <SelectItem value="2">Secondary</SelectItem>
                      <SelectItem value="3">Backup</SelectItem>
                    </SelectContent>
                  </Select>
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
                        className="basis-1/4 relative w-full flex flex-col overflow-hidden "
                      >
                        <div className="w-full aspect-video rounded-xl bg-bgDark3 overflow-hidden relative">
                          <ImageWithFallback
                            src={
                              tmdbBasicImg +
                              "/w300" +
                              data?.results?.backdrop_path
                            }
                            className="w-full h-full object-cover"
                            width="300"
                            height="300"
                            alt="backdrop"
                          />
                          <div className="w-full absolute top-0 left-0 h-full bg-gradient-to-b from-bgDark/0  to-black  rounded-xl overflow-hidden flex justify-start items-end text-xs text-textWhite px-4 py-2">
                            {e?.name}
                          </div>
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

      <InfoSideBar
        data={data}
        showInfo={showInfo}
        setshowInfo={setshowInfo}
        mediatype={mediatype}
        season={season}
        setSeason={setSeason}
        id={id}
      />
    </div>
  );
 
}

export default WatchPage;
