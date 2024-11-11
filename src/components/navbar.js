import { GoHomeFill } from "react-icons/go";
import NavbarPills from "./Main/NavbarPill";
import { IoSearch } from "react-icons/io5";
import { FaTv } from "react-icons/fa6";
import { GiDramaMasks } from "react-icons/gi";
import { GrFavorite } from "react-icons/gr";
import { GiSamuraiHelmet } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { MdOutlineWatchLater } from "react-icons/md";
function Navbar() {

  
  return (
    <div className="w-full h-full  flex flex-col overflow-hidden gap-2">
      <div className="w-full flex flex-col rounded-2xl bg-bgDark p-2 gap-2">
        <NavbarPills link={'/'} Icon={GoHomeFill} title={"Home"} />
        <NavbarPills link={'/search'} Icon={IoSearch} title={"Search"} />
      </div>
      <div className="w-full h-full flex flex-col rounded-2xl bg-bgDark justify-between p-2 gap-2">
        <div className="w-full flex flex-col gap-2">
          <NavbarPills link={'/explore/movie'} Icon={TbPlayerTrackNextFilled} title={"Movies"} />
          <NavbarPills link={'/explore/tv'} Icon={FaTv} title={"TV Shows"} />
          {/* <NavbarPills Icon={GiDramaMasks} title={"K Drama"} /> */}
          {/* <NavbarPills Icon={GiSamuraiHelmet} title={"Anime"} /> */}
        </div>
        <div className="w-full flex flex-col gap-2">
          <NavbarPills Icon={MdOutlineWatchLater} title={"History"} />
          <NavbarPills Icon={GrFavorite} title={"WatchList"} />
          <NavbarPills link={'/login'} Icon={FaRegUser} title={"Login"} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
