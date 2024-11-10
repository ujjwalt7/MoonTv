import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { tmdbBasicImg } from "@/components/values";
import { useEffect, useState } from "react";
import CarouselCard from "./CarouselCard";
import { Skeleton } from "@/components/ui/skeleton";
function CarouselMain({ data, setBgIndex }) {
  const [api, setApi] = useState();
  const onSlideMove = (s) => {
    setBgIndex(s.slidesInView()[0]);
  };
  useEffect(() => {
    if (api) api.on("slidesInView", onSlideMove);
  }, [api]);

  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      className="p-2"
      setApi={setApi}
    >
      <CarouselContent className="p-2 rounded-2xl">
        {data ?data?.["results"]?.map((e, i) => (
          <CarouselItem key={"CarouselMain" + i}>
            <CarouselCard e={e} />
          </CarouselItem>
        )):(
            Array.apply(null, Array(10)).map((e,i)=>(
              <CarouselItem key={"CarouselMain" + i}>
                <Skeleton className="w-full bg-bgDark2 aspect-[10/3] rounded-2xl"/>
            </CarouselItem>
            ))
        )
        }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default CarouselMain;
