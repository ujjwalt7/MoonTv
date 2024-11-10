import { tmdbBasicImg } from "@/components/values";
import { TiStarFullOutline } from "react-icons/ti";
import Link from "next/link";
import CardHoverState from "./CardHoverState";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";import { useEffect, useState } from "react";
import Image from "next/image";
import ImageWithFallback from "@/components/ImageFallback";
function CardofCarouselMainCard({ data, hoverFn, mediatype = "movie" }) {  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!data) return null; // Ensure data exists

  return (
    <Link
      href={`/watch/${data?.media_type || mediatype}/${data?.id}`}
      className="w-full  aspect-[3/4] rounded-2xl relative group"
      onMouseEnter={() => {
        if (hoverFn) {
          hoverFn(data);
        }
      }}
    >
      {mounted && (<HoverCard>
        <HoverCardTrigger>
          <div className="w-full h-full z-[3] overflow-hidden rounded-2xl group-hover:scale-[1.02] transition-all duration-200 ease-linear">
            <ImageWithFallback width="500" height="500"
              src={tmdbBasicImg + "w500/" + data?.poster_path}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-fit z-[3] absolute top-2 right-2 px-3 py-2 rounded-xl text-textWhite bg-black/30 backdrop-blur-md flex gap-1 items-center text-sm">
            <div className="text-xl text-yellow-400">
              <TiStarFullOutline />
            </div>
            {data?.vote_average?.toString()?.substring(0, 3)}
          </div>
        </HoverCardTrigger>
        <HoverCardContent side="right" className="p-0 bg-transparent border-none z-20" >
          <CardHoverState data={data||null}  />
          {/* Hey Im hovered */}
        </HoverCardContent>
      </HoverCard>)}
    </Link>
  );
}

export default CardofCarouselMainCard;
