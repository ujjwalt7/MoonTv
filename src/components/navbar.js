// import { GoHomeFill } from "react-icons/go";
import NavbarPills from "./Main/NavbarPill";
import { RiSearchLine } from "react-icons/ri";
import { RiSearchFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { GoClockFill } from "react-icons/go";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { BsFillTvFill } from "react-icons/bs";
import { BsTv } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { TbPlayerTrackNext } from "react-icons/tb";
import { GoClock } from "react-icons/go";
import { FaUser } from "react-icons/fa";
function Navbar() {
  return (
    <div className="w-full h-full  flex flex-col overflow-hidden gap-2">
      <div className="w-full flex flex-col rounded-2xl bg-bgDark p-2 gap-2">
        <NavbarPills
          link={"/"}
          Icon={GoHomeFill}
          HoverIcon={GoHome}
          title={"Home"}
        />
        <NavbarPills
          link={"/search"}
          Icon={RiSearchFill}
          title={"Search"}
          HoverIcon={RiSearchLine}
        />
      </div>
      <div className="w-full h-full flex flex-col rounded-2xl bg-bgDark justify-between p-2 gap-2">
        <div className="w-full flex flex-col gap-2">
          <NavbarPills
            link={"/explore/movie"}
            Icon={TbPlayerTrackNextFilled}
            title={"Movies"}
            HoverIcon={TbPlayerTrackNext}
          />
          <NavbarPills
            link={"/explore/tv"}
            Icon={BsFillTvFill}
            title={"TV Shows"}
            HoverIcon={BsTv}
          />
          {/* <NavbarPills Icon={GiDramaMasks} title={"K Drama"} /> */}
          {/* <NavbarPills Icon={GiSamuraiHelmet} title={"Anime"} /> */}
        </div>
        <div className="w-full flex flex-col gap-2">
          <NavbarPills
            Icon={GoClockFill}
            title={"History"}
            HoverIcon={GoClock}
          />
          <NavbarPills
            Icon={FaHeart}
            title={"WatchList"}
            HoverIcon={FaRegHeart}
          />
          <NavbarPills
            link={"/login"}
            HoverIcon={FaRegUser}
            Icon={FaUser}
            title={"Login"}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
