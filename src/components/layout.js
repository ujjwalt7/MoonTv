import Navbar from "./navbar";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./Main/AppSidebar";
import { Sheet } from "./ui/sheet";
import LoginFormSheet from "./Main/LoginFormSheet";
import { cloneElement, useState } from "react";

function RootLayout({ children }) {
  const [openLoginSheet, setopenLoginSheet] = useState(false);
  return (
    // <Sheet
    //   open={openLoginSheet}
    //   onOpenChange={setopenLoginSheet}
    //   className="dark"
    // >
      <SidebarProvider className="w-screen p-2 h-screen bg-bg font-[Jost] overflow-hidden text-textDark flex">
        <AppSidebar />
        {/* <div className="w-full h-screen overflow-hidden p-2 pl-0"> */}

        <main className="w-full overflow-hidden rounded-2xl noscb " id="sb">
          {/* <SidebarTrigger /> */}
          {children}
          {/* {cloneElement(children, {
            openLogin: (val) => {
              setopenLoginSheet(val);
            },
          })} */}
          <Toaster />
        </main>
        {/* </div> */}
      </SidebarProvider>
    //   <LoginFormSheet />
    // </Sheet>
    // <div className="w-screen h-screen bg-bg font-[Jost] overflow-hidden text-textDark grid grid-cols-6 p-2 gap-2">
    //   <div className="w-full col-span-1">
    //     <Navbar />
    //   </div>
    //   <div
    //     className="w-full col-span-5 overflow-hidden rounded-2xl noscb "
    //     id="sb"
    //   >
    //     {children}
    //     <Toaster />
    //   </div>
    // </div>
  );
}

export default RootLayout;
