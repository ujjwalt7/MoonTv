import ImageWithFallback from "@/components/ImageFallback";
import CardContainerMain from "@/components/Main/Cards/CardContainerMain";
import CarouselMain from "@/components/Main/Carousel/CarouselMain";
import TopNav from "@/components/topNav";
import { Skeleton } from "@/components/ui/skeleton";
import { tmdbBasicImg } from "@/components/values";
import Image from "next/image";
import { useState } from "react";
export const getServerSideProps  = async (context) => {
  try {
    const carouselres = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/trending`
    );
    const carouseldata = await carouselres.json();
  
    const trendingmovieres = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/gettrend?type=movie`
    );
    const trendingmoviedata = await trendingmovieres.json();
  
    const trendingtvres = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/gettrend?type=tv`
    );
    const trendingtvdata = await trendingtvres.json();
  
    const airingTodayShows = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/airingtoday?type=movie`
    );
    const airingShowsData = await airingTodayShows.json();
    return {
      props: { carouseldata, trendingmoviedata, trendingtvdata, airingShowsData }
    }
  }
  catch(error) {
    console.error("Fetch error:", error);
    return { props: { carouseldata:null, trendingmoviedata:null, trendingtvdata:null, airingShowsData:null } }; // Fallback in case of error
  }
}

export default function Home({
  carouseldata,
  trendingmoviedata,
  trendingtvdata,
  airingShowsData,
}) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [bgBlur, setBgBlur] = useState(
    tmdbBasicImg + "w300" + carouseldata?.["results"]?.[0]?.backdrop_path
  );
  const setBackDropBlurBg = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      // setbgImgBlur(data?.backdrop_path);
      setBgBlur(
        tmdbBasicImg +
          "w300" +
          carouseldata?.["results"]?.[index || 0]?.backdrop_path
      );
      setIsTransitioning(false); // End transition after image change
    }, 200);
  };

  return (
    <div className="w-full h-screen noscb overflow-y-auto bg-bgDark">
      <div className="w-full relative rounded-2xl">
        <div className="w-full h-full absolute top-0 left-0 z-[0] rounded-2xl overflow-hidden">
          {/* <img src={bgBlur} className="w-full h-[70vh] bg-pink-50 blur-3xl transition-all duration-300 ease-in-out"/> */}
          {bgBlur ? (
            <ImageWithFallback
              alt="Bg"
              width="300"
              height="300"
              src={bgBlur}
              className={`w-full h-[70vh] bg-bgDark3 blur-2xl transition-opacity duration-500 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            />
          ) : (
            <Skeleton className="w-full h-[70vh] bg-bgDark3 blur-2xl" />
          )}
        </div>
        <div className="w-full rounded-2xl z-[1] flex flex-col" id="sb">
          <TopNav />
          <div className="w-full flex flex-col gap-4 py-2">
            <CarouselMain data={carouseldata} setBgIndex={setBackDropBlurBg} />
            <CardContainerMain
              title="Trending Movies"
              data={trendingmoviedata}
            />
            <CardContainerMain
              title="Trending TV Shows"
              data={trendingtvdata}
            />
            <CardContainerMain title="Airing 🛫" data={airingShowsData} />
          </div>
        </div>
      </div>
    </div>
  );
}
