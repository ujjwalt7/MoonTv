import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import NavbarPills from "./NavbarPill";
import { GoClock, GoClockFill, GoHome, GoHomeFill } from "react-icons/go";
import { RiSearchFill, RiSearchLine } from "react-icons/ri";
import { BsFillTvFill, BsTv } from "react-icons/bs";
import { TbPlayerTrackNext, TbPlayerTrackNextFilled } from "react-icons/tb";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { SheetTrigger } from "../ui/sheet";
import NavbarSmallPills from "./NavSmallPill";

// Menu items.
const items = [
  {
    title: "Movies",
    url: "/explore/movie",
    icon: TbPlayerTrackNext,
    hovweIcon: TbPlayerTrackNextFilled,
  },
  {
    title: "TV Shows",
    url: "/explore/tv",
    icon: BsTv,
    hovweIcon: BsFillTvFill,
  },
];
const bottomItems = [
  {
    title: "History",
    url: "/history",
    icon: GoClock,
    hovweIcon: GoClockFill,
  },
  {
    title: "Watchlist",
    url: "/watchlist",
    icon: FaRegHeart,
    hovweIcon: FaHeart,
  },
];
export function AppSidebar() {
  return (
    <Sidebar
      collapsible="icon" id="uwu"
      className=" bg-black p-2 pr-0 border-0 ring-0 outline-none gap-2 "
    >
      <SidebarHeader className="bg-bgDark rounded-2xl">
        <SidebarMenu className="gap-3 group-data-[collapsible=icon]:hidden">
          <NavbarPills
            link={"/"}
            Icon={GoHome}
            HoverIcon={GoHomeFill}
            title={"Home"}
          />
          <NavbarPills
            link={"/search"}
            Icon={RiSearchLine}
            title={"Search"}
            HoverIcon={RiSearchFill}
          />
        </SidebarMenu>
        <SidebarMenu className="gap-3 py-2 group-data-[state=expanded]:hidden">
        <NavbarSmallPills 
            link={"/"}
            Icon={GoHome}
            HoverIcon={GoHomeFill}
            /><NavbarSmallPills
            link={"/search"}
            Icon={RiSearchLine}
            HoverIcon={RiSearchFill}
          />
            
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-bgDark rounded-2xl flex justify-between">
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupContent>
            <SidebarMenu className="gap-3 py-1">
              {items.map((item) => (
                <NavbarPills HoverIcon={item.hovweIcon} Icon={item.icon} link={item.url} title={item.title} key={item.title}/>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* <SheetTrigger>Open</SheetTrigger> */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupContent>
            <SidebarMenu className="gap-3 py-1">
              {bottomItems.map((item) => (
                <NavbarPills HoverIcon={item.hovweIcon} Icon={item.icon} link={item.url} title={item.title} key={item.title}/>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarMenu className="gap-3 py-2 pt-4 group-data-[state=expanded]:hidden">
        {items.map((item) => (
                <NavbarSmallPills HoverIcon={item.hovweIcon} Icon={item.icon} link={item.url} title={item.title} key={item.title}/>
              ))}
            
        </SidebarMenu>
        <SidebarMenu className="gap-3 py-2 pb-4 group-data-[state=expanded]:hidden">
        {bottomItems.map((item) => (
                <NavbarSmallPills HoverIcon={item.hovweIcon} Icon={item.icon} link={item.url} title={item.title} key={item.title}/>
              ))}
            
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
