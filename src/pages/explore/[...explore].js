import TopNav from "@/components/topNav";
import { tmdbBasicImg } from "@/components/values";
import { useRouter } from "next/router";
import { FaFilter } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import CardofCarouselMainCard from "@/components/Main/Cards/CardofCarouselMainCard";
import Link from "next/link";
import Image from "next/image";
import ImageWithFallback from "@/components/ImageFallback";
export const getServerSideProps = async (context) => {
  try{const mediatype = context.query.explore[0] || "movie";
  const pageno = context.query.explore[1] || "1";
  const trendingmovieres = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/popular?type=${mediatype}&page=${pageno}`
  );
  const trendingmoviedata = await trendingmovieres.json();
  return { props: { trendingmoviedata } };}catch (error) {
    console.error("Fetch error:", error);
    return { props: { trendingmoviedata: null } }; // Fallback in case of error
  }
};

function ExplorePage({ trendingmoviedata }) {
  // console.log(trendingmoviedata)
  const [bgImgBlur, setbgImgBlur] = useState(
    trendingmoviedata?.results?.results?.[0]?.backdrop_path
  );
  const router = useRouter();
  const mediatype = router.query.explore[0];
  const page = Number(router.query.explore[1]) || 1;

  // const OnHoverFn = (data) => {
  //   setbgImgBlur(data?.backdrop_path);
  // };
  const [isTransitioning, setIsTransitioning] = useState(false);
  const OnHoverFn = (data) => {
    setIsTransitioning(true); // Start transition
    setTimeout(() => {
      setbgImgBlur(data?.backdrop_path);
      setIsTransitioning(false); // End transition after image change
    }, 300); // Adjust timeout for a smoother effect if needed
  };
  const onInputChangeHandle = (val) => {
    router.replace(`/search/${val}`);
  };

  return (
    <div className="w-full h-full relative overflow-y-auto noscb">
      <div className="w-full h-[100%] absolute top-0 left-0 z-[0] rounded-2xl overflow-hidden">
        {/* <img key={bgImgBlur}
          src={tmdbBasicImg + "w300/" + bgImgBlur}
          className="w-full h-[70vh] bg-bgDark3 transition-all duration-500 blur-3xl transition-all duration-700 ease-in-out "
        /> */}
        <ImageWithFallback key={bgImgBlur} alt="Backdrop" width="300" height="500"
          src={`${tmdbBasicImg}w300/${bgImgBlur}`}
          className={`w-full h-[70vh] bg-bgDark3 blur-2xl transition-opacity duration-500 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
      <div className="w-full min-h-[200vh] flex flex-col gap-4 blur-0" id="scroll">
        <TopNav title={`Explore ${router.query.explore[0]}`} />
        <div className="w-full px-4 flex gap-2 items-center">
          <div className="w-full gap-4 flex bg-black/30 backdrop-blur-md rounded-lg px-4 py-3">
            <div className="text-2xl text-textWhite">
              <IoSearch />
            </div>
            <div className="w-full">
              <input
                type="search"
                name="search"
                placeholder="Search for movies....."
                id="search"
                autoFocus
                onChange={(e) => onInputChangeHandle(e?.target?.value)}
                className="w-full text-textWhite text-sm bg-transparent outline-none"
              />
            </div>
          </div>
          <div className="rounded-lg p-3 text-xl bg-black/30 backdrop-blur-md text-[#ccc]">
            <FaFilter />
          </div>
        </div>
        <div className="w-full flex justify-between items-center px-6">
          <div className="flex">
            <div className="text-sm font-medium text-textSec">
              {trendingmoviedata?.results?.total_results} results
            </div>
          </div>
          <div className="flex items-center gap-4 text-textSec">
            <div className="text-sm">
              Page {trendingmoviedata?.results?.page} of{" "}
              {trendingmoviedata?.results?.total_pages}
            </div>
            <div className="flex w-fit bg-bgDark/20 backdrop-blur-lg  rounded-lg overflow-hidden">
              <Link
                href={`${mediatype}/${page - 1}`}
                className={`p-2 text-xl text-textSec ${
                  page == 1 ? "hidden" : ""
                }`}
              >
                <IoIosArrowBack />
              </Link>
              <div
                className={`w-[2px] self-stretch my-[5px] bg-textSec/40 ${
                  page == 1 ? "hidden" : ""
                }`}
              ></div>
              <Link
                href={`${mediatype}/${page + 1}`}
                className="p-2 text-xl text-textSec"
              >
                <IoIosArrowForward />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-8 gap-2 px-4 py-2">
          {trendingmoviedata?.results?.results?.map((e, i) => (
            <CardofCarouselMainCard
              hoverFn={OnHoverFn} mediatype={mediatype}
              data={e}
              key={"ExplorePage" + i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;
