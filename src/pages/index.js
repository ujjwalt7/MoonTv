import ImageWithFallback from "@/components/ImageFallback";
import TopMoviesShowcase from "@/components/Main/Additional/TopMovies";
import CardContainerMain from "@/components/Main/Cards/CardContainerMain";
import CarouselMain from "@/components/Main/Carousel/CarouselMain";
import TopNav from "@/components/topNav";
import { Skeleton } from "@/components/ui/skeleton";
import { ANIME } from "@consumet/extensions"
import { tmdbBasicImg } from "@/components/values";
import Image from "next/image";
import { useEffect, useState } from "react";
import AnimeCardContainer from "@/components/Main/Cards/AnimeCardContainer";
import SearchCommandBox from "@/components/Main/Additional/SearchCommandBox";
import LoadingScreen from "@/components/LoadingScreen";
import { motion, AnimatePresence } from "framer-motion";
import Head from 'next/head';
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

    const topratedMovies = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/toprated?type=movie`
    );
    const topratedMoviesData = await topratedMovies.json();

    // const topAnimeTv = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/api/topAnime`
    // );
    // const topAnimeTVData = await topAnimeTv.json();



    return {
      props: { carouseldata, trendingmoviedata, trendingtvdata, airingShowsData,topratedMoviesData,
        // topAnimeTVData
       }
    }
  }
  catch(error) {
    console.error("Fetch error:", error);
    return { props: { carouseldata:null, trendingmoviedata:null, trendingtvdata:null, airingShowsData:null } }; // Fallback in case of error
  }
}

// SplashScreen component
// REMOVE THIS ENTIRE COMPONENT
// function SplashScreen({ appName, onFinish }) {
//   const [show, setShow] = useState(true);
//   const [slideUp, setSlideUp] = useState(false);
//
//   useEffect(() => {
//     // Reveal text quickly, then trigger slide up
//     const revealTimer = setTimeout(() => {
//       setSlideUp(true);
//     }, 700); // Text reveal duration
//   
//     // Remove splash after slide up
//     const hideTimer = setTimeout(() => {
//       setShow(false);
//       if (onFinish) onFinish();
//     }, 1000); // Total splash duration (quick)
//   
//     return () => {
//       clearTimeout(revealTimer);
//       clearTimeout(hideTimer);
//     };
//   }, [onFinish]);
//
//   return show ? (
//     <div
//       className={`fixed inset-0 z-[9999] flex items-center justify-center bg-bgDark transition-transform duration-300 ${
//         slideUp ? "splash-slide-up" : ""
//       }`}
//       style={{
//         willChange: "transform, opacity",
//         transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.2s"
//       }}
//     >
//       <h1 className="text-5xl md:text-7xl font-medium text-white tracking-widest animate-text-reveal">
//         {appName.split("").map((char, i) => (
//           <span
//             key={i}
//             style={{
//               opacity: 0,
//               animation: `fadeInChar 0.35s cubic-bezier(0.4,0,0.2,1) forwards`,
//               animationDelay: `${i * 0.04}s`
//             }}
//             className="inline-block"
//           >
//             {char}
//           </span>
//         ))}
//       </h1>
//       <style jsx global>{`
//         @keyframes fadeInChar {
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//         }
//         .animate-text-reveal span {
//           opacity: 0;
//           transform: translateY(20px);
//         }
//         .splash-slide-up {
//           transform: translateY(-100%);
//           opacity: 0;
//         }
//       `}</style>
//     </div>
//   ) : null;
// }

export default function Home({
  carouseldata,
  trendingmoviedata,
  trendingtvdata,
  airingShowsData,
  topratedMoviesData,
  // topAnimeTVData
}) {


  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e) => {
      if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Add a loading state for minimum 0.5s
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [carouseldata, trendingmoviedata, trendingtvdata, airingShowsData, topratedMoviesData]);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [bgBlur, setBgBlur] = useState(
    tmdbBasicImg + "w300" + carouseldata?.["results"]?.[0]?.backdrop_path
  );
  const setBackDropBlurBg = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setBgBlur(
        tmdbBasicImg +
          "w300" +
          carouseldata?.["results"]?.[index || 0]?.backdrop_path
      );
      setIsTransitioning(false);
    }, 100);
  };

  // Add a loading state for each block
  const isCarouselLoading = loading || !carouseldata || !carouseldata.results;
  const isTrendingMoviesLoading = loading || !trendingmoviedata || !trendingmoviedata.results;
  const isTrendingTVLoading = loading || !trendingtvdata || !trendingtvdata.results;
  const isTopRatedMoviesLoading = loading || !topratedMoviesData || !topratedMoviesData.results;
  const isAiringShowsLoading = loading || !airingShowsData || !airingShowsData.results;
  // Splash screen state
  // REMOVE SPLASH SCREEN STATE AND HANDLER
  // const [showSplash, setShowSplash] = useState(true);
  // const handleSplashFinish = () => setShowSplash(false);

  return (
    <>
      <Head>
        <title>{"Home - " + process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      {/* REMOVE SPLASH SCREEN CONDITIONAL RENDERING */}
      {/* {showSplash && (
        <SplashScreen
          appName="TARE"
          onFinish={handleSplashFinish}
        />
      )} */}
      {/* The rest of your page content remains unchanged */}
      {/* {!showSplash && ( */}
        <div className="w-full h-screen noscb overflow-y-auto overflow-x-hidden bg-bgDark relative">
          <SearchCommandBox open={open} setOpen={setOpen} />
          <div className="w-full relative rounded-2xl">
    <div className="w-full h-screen noscb overflow-y-auto overflow-x-hidden bg-bgDark relative">
      <SearchCommandBox open={open} setOpen={setOpen} />
      <div className="w-full relative rounded-2xl">
        <div className="w-full h-full absolute top-0 left-0 z-[0] rounded-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            {bgBlur && (
              <motion.img
                key={bgBlur}
                src={bgBlur}
                alt="Bg"
                width={300}
                height={300}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full h-[70vh] bg-bgDark3 blur-2xl object-cover absolute inset-0"
              />
            )}
            {!bgBlur && (
              <Skeleton className="w-full h-[70vh] bg-bgDark3 blur-2xl" />
            )}
          </AnimatePresence>
        </div>
        <div className="w-full rounded-2xl z-[1] flex flex-col" id="sb">
          <TopNav />
          <div className="w-full flex flex-col gap-4 py-2">
            {/* Carousel Skeleton */}
            {isCarouselLoading ? (
              <Skeleton className="w-full h-64 md:h-96 rounded-2xl" />
            ) : (
              <CarouselMain data={carouseldata} setBgIndex={setBackDropBlurBg} />
            )}

            {/* Trending Movies Skeleton */}
            {isTrendingMoviesLoading ? (
              <div>
                <Skeleton className="h-8 w-48 mb-2 rounded-lg" />
                <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="aspect-[2/3] rounded-xl" />
                  ))}
                </div>
              </div>
            ) : (
              <CardContainerMain
                title="Trending Movies"
                data={trendingmoviedata}
              />
            )}

            {/* Trending TV Shows Skeleton */}
            {isTrendingTVLoading ? (
              <div>
                <Skeleton className="h-8 w-48 mb-2 rounded-lg" />
                <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="aspect-[2/3] rounded-xl" />
                  ))}
                </div>
              </div>
            ) : (
              <CardContainerMain
                title="Trending TV Shows"
                data={trendingtvdata}
              />
            )}

            {/* Top Rated Movies Skeleton */}
            {isTopRatedMoviesLoading ? (
              <div>
                <Skeleton className="h-8 w-48 mb-2 rounded-lg" />
                <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="aspect-[2/3] rounded-xl" />
                  ))}
                </div>
              </div>
            ) : (
              <TopMoviesShowcase data={topratedMoviesData?.['results']?.['results']?.slice(0,9)}/>
            )}

            {/* Airing Shows Skeleton */}
            {isAiringShowsLoading ? (
              <div>
                <Skeleton className="h-8 w-48 mb-2 rounded-lg" />
                <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="aspect-[2/3] rounded-xl" />
                  ))}
                </div>
              </div>
            ) : (
              <CardContainerMain title="Airing 🛫" data={airingShowsData} />
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
        </div>
      )
      {/* } */}
    </>
  );
}
