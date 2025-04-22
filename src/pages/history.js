import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabase";
import LibraryLayout from "@/components/Layout/LibraryLayout";
import CardofCarouselMainCard from "@/components/Main/Cards/CardofCarouselMainCard";
import { IoTime } from "react-icons/io5";
import ImageWithFallback from "@/components/ImageFallback";
import { tmdbBasicImg } from "@/components/values";
import { motion, AnimatePresence } from "framer-motion";
import { Spinner } from "@/components/ui/spinner";
import Head from 'next/head';

export default function HistoryPage() {
  const { user } = useUser();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bgImgBlur, setbgImgBlur] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    async function fetchHistory() {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        const { data: historyData, error } = await supabase
          .from('watch_history')
          .select('*')
          .eq('user_id', user.id)
          .order('watched_at', { ascending: false });

        if (error) throw error;

        const mediaDetails = await Promise.all(
          (historyData || []).map(async (item) => {
            const res = await fetch(
              `/api/media/${item.media_type}/${item.media_id}`
            );
            const mediaData = await res.json();
            return {
              ...mediaData,
              progress: item.watch_progress,
              watched_at: item.watched_at,
            };
          })
        );

        setHistory(mediaDetails);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, [user]);

  const OnHoverFn = (data) => {
    setbgImgBlur(data?.backdrop_path);
  };

  if (loading) {
    return (
      <LibraryLayout title="Watch History">
        <div className="flex justify-center items-center h-[50vh]">
          <Spinner />
        </div>
      </LibraryLayout>
    );
  }

  if (!user) {
    return (
      <LibraryLayout title="Watch History">
        <div className="flex flex-col items-center justify-center py-20">
          <IoTime className="w-16 h-16 text-gray-600 mb-4" />
          <h2 className="text-xl text-gray-400">Please sign in to view your watch history</h2>
        </div>
      </LibraryLayout>
    );
  }

  return (
    <>
      <Head>
        <title>{"Watch History - " + process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <LibraryLayout title="Watch History">
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
            Watch History
          </h1>
        </div>
        <AnimatePresence>
          {history.length > 0 ? (
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {history.map((item) => (
                <CardofCarouselMainCard
                  key={item.id}
                  data={item}
                  hoverFn={OnHoverFn}
                />
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <IoTime className="w-16 h-16 text-gray-600 mb-4" />
              <h2 className="text-xl text-gray-400">No watch history yet</h2>
            </div>
          )}
        </AnimatePresence>
      </LibraryLayout>
    </>
  );
}