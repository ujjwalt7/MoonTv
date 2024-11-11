import Navbar from "./navbar";import { Toaster } from "@/components/ui/toaster"
function RootLayout({ children }) {
  return (
    <div className="w-screen h-screen bg-bg font-[Jost] overflow-hidden text-textDark grid grid-cols-6 p-2 gap-2">
      <div className="w-full col-span-1">
        <Navbar />
      </div>
      <div className="w-full col-span-5 overflow-hidden rounded-2xl noscb " id="sb">{children}
        <Toaster /></div>
    </div>
  );
}

export default RootLayout;
