import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel";
  import CardofCarouselMainCard from "./CardofCarouselMainCard";
  import {useState,useEffect} from "react"
  import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
  import { Skeleton } from "@/components/ui/skeleton";
  function AnimeCardContainer({ data ,title = "Trending Movies" }) {
    const [capi ,setCarouselApi] = useState();

    // console.log(data)
    
    return (
      <div className="w-full blur-0 text-textWhite flex flex-col gap-4  overflow-visible">
        <div className="w-full px-6 flex justify-between items-center">
          <div className="text-xl font-medium">{title}</div>
          {/* <div className=""> */}
          <div className="flex w-fit bg-bgDark2/40 backdrop-blur-lg  rounded-lg overflow-hidden">
                <div
                  className={`p-2 text-xl text-textSec`}
                onClick={()=>{
                  capi.scrollPrev()}}>
                  <IoIosArrowBack />
                </div>
                <div
                  className={`w-[2px] self-stretch my-[5px] bg-textSec/40`}
                ></div>
                <div onClick={()=>{
      capi.scrollNext()}}
                  className="p-2 text-xl text-textSec"
                >
                  <IoIosArrowForward />
                </div>
              </div>
          {/* </div> */}
        </div>
        <div className="w-full overflow-visible">
          <Carousel
            opts={{
              align: "start",
            }} setApi={setCarouselApi} 
          >
            <CarouselContent className="ml-4 py-3">
              {data?.results ? data?.results?.data?.map((e, i) => (
                <CarouselItem
                  key={"CarouselCardMain" + i}
                  className="md:basis-52 basis-44 md:pl-3  pl-2 "
                >
                  <CardofCarouselMainCard mediatype="anime" data={e}/>
                </CarouselItem>
              )):(
                Array.apply(null, Array(10)).map((e,i)=>(
                  <CarouselItem
                  key={"CarouselCardMain" + i}
                  className="md:basis-52 basis-44 md:pl-3  pl-2 "
                >
                  <Skeleton className="w-full bg-bgDark2 aspect-[3/4] rounded-2xl"/>
                </CarouselItem>
                ))
              )}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    );
  }
  
  export default AnimeCardContainer;
  