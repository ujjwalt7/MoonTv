import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabase";
import LibraryLayout from "@/components/Layout/LibraryLayout";
import CardofCarouselMainCard from "@/components/Main/Cards/CardofCarouselMainCard";
import { IoBookmarkOutline } from "react-icons/io5";
import { Spinner } from "@/components/ui/spinner";
import ImageWithFallback from "@/components/ImageFallback";
import { tmdbBasicImg } from "@/components/values";
import { motion, AnimatePresence } from "framer-motion";
import Head from 'next/head';

export default function WatchlistPage() {
  const { user } = useUser();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bgImgBlur, setbgImgBlur] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    async function fetchWatchlist() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data: watchlistData, error } = await supabase
          .from('watchlist')
          .select('*')
          .eq('user_id', user.id)
          .order('added_at', { ascending: false });

        if (error) throw error;

        const mediaDetails = watchlistData.map(item => ({
          ...item.media_data, // <-- use the stored JSON
          media_type: item.media_type,
          added_at: item.added_at,
          id: item.media_id // or whatever unique id you use
        }));
        setWatchlist(mediaDetails);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchWatchlist();
  }, [user]);

  const OnHoverFn = (data) => {
    setbgImgBlur(data?.backdrop_path);
  };

  if (loading) {
    return (
      <LibraryLayout title="My Watchlist">
        <div className="flex justify-center items-center h-[50vh]">
          <Spinner />
        </div>
      </LibraryLayout>
    );
  }

  if (!user) {
    return (
      <LibraryLayout title="My Watchlist">
        <div className="flex flex-col items-center justify-center py-20">
          <IoBookmarkOutline className="w-16 h-16 text-gray-600 mb-4" />
          <h2 className="text-xl text-gray-400">Please sign in to view your watchlist</h2>
        </div>
      </LibraryLayout>
    );
  }

  return (
    <>
      <Head>
        <title>{"Watchlist - " + process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
    <LibraryLayout title="My Watchlist">
      <div className="w-full h-[100%] absolute top-0 left-0 z-[0] rounded-2xl overflow-hidden">
        <ImageWithFallback
          key={bgImgBlur}
          alt="Backdrop"
          width="300"
          height="500"
          src={`${tmdbBasicImg}w300/${bgImgBlur}`}
          className={`w-full h-[70vh] bg-bgDark3 overflow-hidden blur-xl transition-opacity duration-500 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
      <div className="relative z-10 flex justify-start items-center py-8">
        <h1 className="text-4xl font-medium text-white tracking-tight ">
          Watchlist
        </h1>
      </div>
      <AnimatePresence>
        {watchlist.length > 0 ? (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {watchlist.map((item) => (
              <CardofCarouselMainCard
                key={`${item.id}-${item.media_type}`}
                data={item}
                hoverFn={OnHoverFn}
                showWatchlistButton={true}
                onWatchlistUpdate={() => {
                  setWatchlist(prev => prev.filter(i => i.id !== item.id));
                }}
              />
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <IoBookmarkOutline className="w-16 h-16 text-gray-600 mb-4" />
            <h2 className="text-xl text-gray-400">Your watchlist is empty</h2>
          </div>
        )}
      </AnimatePresence>
    </LibraryLayout>
    </>
  );
}
