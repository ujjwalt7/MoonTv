import Link from "next/link";
import { SidebarMenuButton } from "../ui/sidebar";

function NavbarSmallPills({ Icon, link, HoverIcon }) {
  // return (
  //   <Link
  //     href={link || "/"}
  //     className="w-full group text-textWhite flex rounded-xl gap-4 px-4 py-2 font-medium items-center"
  //   >
  //     <div className="text-2xl relative">
  //       <div className="absolute top-0  opacity-100 group-hover:opacity-0 transition-all duration-200 left-0 text-2xl w-full h-full flex justify-center items-center">
  //           <HoverIcon />
  //       </div>
  //       <div className="w-full h-full text-2xl flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-200">
  //         <Icon />
  //       </div>
  //     </div>
  //     {title}
  //   </Link>
  // );
  return (
    <div asChild className="w-full hover:bg-bgDark flex justify-center py-1">
      <Link href={link} className="group/navpill relative text-[1.7rem] ">
        {/* <div className=""> */}
          <Icon className="opacity-100 group-hover/navpill:opacity-0" />
          <HoverIcon className="opacity-0 absolute top-0 left-0 group-hover/navpill:opacity-100" />
        {/* </div> */}
      </Link>
    </div>
  );
}

export default NavbarSmallPills;
