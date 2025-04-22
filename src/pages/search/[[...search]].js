import ImageWithFallback from "@/components/ImageFallback";
import CardofCarouselMainCard from "@/components/Main/Cards/CardofCarouselMainCard";
import TopNav from "@/components/topNav";
import { tmdbBasicImg } from "@/components/values";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useEffect } from "react";
import Head from 'next/head';

export const getServerSideProps = async (context) => {
  // const mediatype = context.query.explore[0] || "movie";
  // const pageno = context.query.explore[1] || "1";
  try {
if(context.query?.search?.[0]){
  const trendingmovieres = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/search?query=${
      context.query?.search?.[0] || ""
    }&page=${context.query?.search?.[1] || 1}`
  );
  const tempData = await trendingmovieres.json();

  // const moviesres =

  return { props: { tempData } };
}
else {
  const carouselres = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/trending`
  );
  const tempData = await carouselres.json();
  return { props: { tempData:{results:tempData,page:1,total_pages:1} } };

}
  } catch (error) {
    console.error("Fetch error:", error);
    return { props: { tempData: null } }; // Fallback in case of error
  }
};

function SearchPage({ tempData }) {
  const router = useRouter();
  const [sq, setsq] = useState(router?.query?.search?.[0] || "");
  const page = Number(router?.query?.search?.[1]) || 1;
  const [bgImgBlur, setbgImgBlur] = useState(
    tempData?.results?.results?.[0]?.backdrop_path
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Add this state to track if animation has run
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Run animation only on first mount
    if (!hasAnimated) {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
        setHasAnimated(true);
      }, 300); // Adjust timeout as needed
    }
  }, [hasAnimated]);

  const OnHoverFn = (data) => {
    setbgImgBlur(data?.backdrop_path);
    // Do NOT trigger animation here
  };

  const onInputChangeHandle = (val) => {
    setsq(val);
    router?.replace(`/search/${val}`);
    // Do NOT trigger animation here
  };

  return (
    <>
      <Head>
        <title>{`Search${sq ? `: ${sq}` : ""} - ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
      </Head>
      <div className="w-full h-full relative overflow-y-auto noscb">
        <div className="w-full h-[100%] absolute top-0 left-0 z-[0] rounded-2xl overflow-hidden">
          <ImageWithFallback
            key={bgImgBlur}
            alt="Backdrop"
            width="300"
            height="500"
            src={`${tmdbBasicImg}w300/${bgImgBlur}`}
            className={`w-full h-[70vh] bg-bgDark3 blur-xl transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
        <div
          className="w-full  flex flex-col gap-4 blur-0"
          id="scroll"
        >
          <TopNav title="Search" />
          <div className="w-full px-4 flex gap-2 items-center">
            <div className="w-full gap-4 flex bg-black/30 backdrop-blur-md rounded-lg px-4 py-3">
              <div className="text-2xl text-textWhite">
                <IoSearch />
              </div>
              <div className="w-full">
                <input
                  type="search"
                  name="search"
                  value={sq}
                  onChange={(e) => onInputChangeHandle(e.target.value)}
                  placeholder="Search for movies....."
                  id="search"
                  autoFocus
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
                {tempData?.results?.total_results} results
              </div>
            </div>
            <div className="flex items-center gap-4 text-textSec">
              <div className="text-sm">
                Page {tempData?.results?.page} of {tempData?.results?.total_pages}
              </div>
              <div className="flex w-fit bg-bgDark/20 backdrop-blur-lg  rounded-lg overflow-hidden">
                <Link
                  href={`/search/${sq}/${page - 1}`}
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
                  href={`/search/${sq}/${page + 1}`}
                  className={`p-2 text-xl text-textSec ${
                    page == tempData?.results?.total_pages ? "hidden" : ""
                  }`}
                >
                  <IoIosArrowForward />
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-8 gap-2 px-4 py-2">
            {tempData?.results?.results?.map((e, i) => (
              <CardofCarouselMainCard
                hoverFn={OnHoverFn}
                data={e}
                key={"ExplorePage" + i}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
