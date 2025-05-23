import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useCallback, useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { signOut } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/router";
import { SidebarTrigger } from "./ui/sidebar";
import { FaUserAstronaut } from "react-icons/fa";

function TopNav({ title }) {
  const { toast } = useToast();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isvisible, setIsVisible] = useState(true);
  const [bgBlur, setBgBlur] = useState(false);
  const { user, setUser } = useUser();
  const router = useRouter();

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
  }, [lastScrollY]);

  useEffect(() => {
    const element = document.getElementsByClassName("noscb")?.[1];

    if (element) {
      element.addEventListener("scroll", onScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", onScroll);
      }
    };
  }, [lastScrollY, onScroll]);

  const handleNavigation = (url) => {
    toast({
      title: "Loading",
      description: "Please wait while the page loads...",
    });
    router.push(url);
  };

  return (
    <div
      className={`w-full sticky p-2 z-[5] ${
        bgBlur ? "backdrop-blur-md bg-black/30" : "backdrop-blur-0"
      } ${
        isvisible ? "top-[-100%]" : "top-0"
      } transition-all duration-300 `}
    >
      <div className="w-full flex justify-between py-2 px-4">
        <div className="w-full flex items-center gap-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className=" text-textWhite rounded-full" />
            <div className="p-2 rounded-full text-xl bg-white/10 backdrop-blur-lg text-textWhite">
              <IoIosArrowBack onClick={() => handleNavigation('/previous-page')} />
            </div>
            <div className="p-2 rounded-full text-xl bg-white/10 backdrop-blur-lg text-textWhite">
              <IoIosArrowForward onClick={() => handleNavigation('/next-page')} />
            </div>
          </div>
          {title == null || title == undefined ? (
            <Link href="/search" className="w-1/3 rounded-full bg-white/10 backdrop-blur-lg flex gap-2 py-2 px-3">
              <div className="text-2xl text-textWhite">
                <IoSearch />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search movies, tv shows, anime...."
                className="text-textWhite placeholder:text-textWhite text-sm outline-none bg-transparent w-full"
              />
            </Link>
          ) : (
            <div className="text-xl font-medium text-textWhite px-4">
              {title}
            </div>
          )}
        </div>
        <div className="px-4">
          <div onClick={async () => {
            if (user) {
              const { error } = await signOut();
              if (error) {
                toast({
                  title: "Error Occurred",
                  description: `${error}`,
                  variant: "destructive",
                });
              } else {
                toast({
                  title: "Logged Out",
                  description: "You Have been Logged Out Successfully",
                });
              }
            } else {
              toast({
                title: "Redirecting to Login",
                description: "Please wait while we redirect to new Page and login",
              });
              router?.push('/login');
            }
          }} className="p-2 pr-3 text-2xl text-textWhite gap-2 rounded-full bg-white/20 backdrop-blur-lg flex justify-center items-center">
            {user ? <BiLogOut /> : <FaUserAstronaut className="text-2xl p-1 pr-0" />}
            {user ? <div className="text-sm">Logout</div> : <div className="text-sm">Login</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
