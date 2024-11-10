import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useCallback, useEffect, useState } from "react";
function TopNav({ title }) {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isvisible, setIsVisible] = useState(true);
  const [bgBlur, setBgBlur] = useState(false);
  const onScroll = useCallback((event) => {
    const scval = event?.target?.scrollTop;

    if (lastScrollY > scval) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    if (scval > 100) {
      setBgBlur(true);
    } else {
      setBgBlur(false);
    }
    setLastScrollY(scval);
  },[lastScrollY]);

  useEffect(() => {
    const element = document.getElementsByClassName("noscb")?.[1];

    if (element) {
      element.addEventListener("scroll", onScroll);
    }

    // Cleanup function to remove event listener on unmount
    return () => {
      if (element) {
        element.removeEventListener("scroll", onScroll);
      }
    };
  }, [lastScrollY,onScroll]);

  return (
    <div
      className={`w-full sticky p-2 z-[100] ${
        bgBlur ? "backdrop-blur-md" : "backdrop-blur-0"
      } ${
        isvisible ? "top-[-100%]" : "top-0"
      } transition-all duration-300 `}
    >
      <div className="w-full flex justify-between py-2">
        <div className="w-full flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full text-xl bg-white/10 backdrop-blur-lg text-textWhite">
              <IoIosArrowBack />
            </div>
            <div className="p-2 rounded-full text-xl bg-white/10 backdrop-blur-lg text-textWhite">
              <IoIosArrowForward />
            </div>
          </div>
          {title == null || title == undefined ? (
            <div className="w-1/3 rounded-full bg-white/10 backdrop-blur-md flex gap-2 py-2 px-3">
              <div className="text-2xl text-textWhite">
                <IoSearch />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search movies, tv shows, anime...."
                className="text-textWhite text-sm outline-none bg-transparent w-full"
              />
            </div>
          ) : (
            <div className="text-xl font-medium text-textWhite px-4">
              {title}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopNav;
