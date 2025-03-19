import ImageWithFallback from "@/components/ImageFallback";
import { tags, tmdbBasicImg } from "@/components/values";
import Link from "next/link";
import { TiStarFullOutline } from "react-icons/ti";

function TopMoviesShowcase({ data,mediatype="movie" }) {

  return (
    <div className="w-full min-h-[50vh] z-[1]">
      <div className="w-full flex px-6 items-center">
        <div className="text-xl font-medium text-textWhite">Top Movies</div>
      </div>
      <div className="w-full grid grid-cols-3 px-6 py-4 gap-2">
        {data?.map((e, i) => (
          <Link href={`/watch/${e?.media_type || mediatype}/${e?.id}`} key={"topRatedCard" + i} className="w-full flex relative pl-12">
            <div className="text-9xl z-[2] absolute flex h-full items-start py-1 z-2 top-0 left-0 w-full ">{i + 1}</div>
            <div className="w-full grid grid-cols-3 gap-1 p-1 rounded-xl z-[4] overflow-hidden hover:bg-bgDark2/10 border border-transparent hover:border-bgDark3/20 transition-all duration-200">
              <div className="w-full  aspect-[9/11] bg-bgDark3 rounded-xl overflow-hidden">
                <ImageWithFallback
                  key={e?.poster_path}
                  width="500"
                  height="500"
                  src={tmdbBasicImg + "w500/" + e?.poster_path}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col col-span-2 justify-center gap-2 w-full px-1 py-2">
                <div className="w-full flex flex-col ">

                <div className="text-xl font-medium text-textWhite/90 text-wrap">{e?.title ||
                  e?.original_title ||
                  e?.name ||
                  e?.original_name}</div>
              <div className="w-full text-wrap text-textSec/40 text-xs">{e?.overview?.substring(0, 150) + "...."}</div>
                  </div>
              <div className="w-full flex text-lg font-medium text-textSec">
                <div className="text-2xl text-yellow-400">
                              <TiStarFullOutline />
                            </div>
                            {e?.vote_average?.toString()?.substring(0, 3)}
              </div>
              <div className="w-full px-2 flex flex-wrap gap-1">
              {e?.genre_ids?.map((eg, ig) => (
              <div
                className="text-xs px-2 py-1 h-fit w-fit rounded-lg bg-bgDark3/30 text-textSec whitespace-nowrap"
                key={ig + "genreids"}
              >
                {(tags?.find((ew)=>ew.id==eg))?.name}
              </div>
            ))}
              </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TopMoviesShowcase;
