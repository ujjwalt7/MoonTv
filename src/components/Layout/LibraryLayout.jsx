import TopNav from "@/components/topNav";

export default function LibraryLayout({ children, title }) {
  return (
    <div className="w-full min-h-screen bg-bgDark">
      <TopNav />
      <div className="w-full px-4 md:px-8 pt-24">
        <h1 className="text-3xl font-bold text-white mb-8">{title}</h1>
        {children}
      </div>
    </div>
  );
}