import Navbar from "./navbar";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./Main/AppSidebar";
import { Sheet } from "./ui/sheet";
import LoginFormSheet from "./Main/LoginFormSheet";
import { cloneElement, useState } from "react";
import { ThemeProvider } from "./theme-provider";
import { AnimatePresence, motion } from "framer-motion"; // Add this import
import { useRouter } from "next/router"; // Add this import

function RootLayout({ children }) {
  const [openLoginSheet, setopenLoginSheet] = useState(false);
  const router = useRouter(); // Add this line

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider className="w-screen p-2 h-screen bg-bg font-[Jost] overflow-hidden text-textDark flex">
        <AppSidebar />
        <main className="w-full overflow-hidden rounded-2xl noscb " id="sb">
          {/* <SidebarTrigger /> */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={router.asPath}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
          {/* {cloneElement(children, {
            openLogin: (val) => {
              setopenLoginSheet(val);
            },
          })} */}
          <Toaster />
        </main>
      </SidebarProvider>
    </ThemeProvider>
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
