import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabase";
import LibraryLayout from "@/components/Layout/LibraryLayout";
import CardofCarouselMainCard from "@/components/Main/Cards/CardofCarouselMainCard";
import { IoBookmarkOutline } from "react-icons/io5";
import { Spinner } from "@/components/ui/spinner";

export default function WatchlistPage() {
  const { user } = useUser();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWatchlist() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data: watchlistData, error } = await supabase
          .from('watch_later')
          .select('*')
          .eq('user_id', user.id)
          .order('added_at', { ascending: false });

        if (error) throw error;

        // Fetch media details for each watchlist item
        const mediaDetails = await Promise.all(
          watchlistData.map(async (item) => {
            const res = await fetch(`/api/media/${item.media_type}/${item.media_id}`);
            const data = await res.json();
            return {
              ...data,
              media_type: item.media_type,
              added_at: item.added_at
            };
          })
        );

        setWatchlist(mediaDetails);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchWatchlist();
  }, [user]);

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
    <LibraryLayout title="My Watchlist">
      {watchlist.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {watchlist.map((item) => (
            <CardofCarouselMainCard
              key={`${item.id}-${item.media_type}`}
              data={item}
              showWatchlistButton={true}
              onWatchlistUpdate={() => {
                setWatchlist(prev => prev.filter(i => i.id !== item.id));
              }}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <IoBookmarkOutline className="w-16 h-16 text-gray-600 mb-4" />
          <h2 className="text-xl text-gray-400">Your watchlist is empty</h2>
        </div>
      )}
    </LibraryLayout>
  );
}
