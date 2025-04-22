import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext"; // Change this import
import { supabase } from "@/lib/supabase"; // Add this import
import LibraryLayout from "@/components/Layout/LibraryLayout";
import CardofCarouselMainCard from "@/components/Main/Cards/CardofCarouselMainCard";
import { IoTime } from "react-icons/io5";

export default function HistoryPage() {
  const { user } = useUser(); // Use our context instead
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

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

        // Fetch media details for each history item
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
    <LibraryLayout title="Watch History">
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-[2/3] bg-gray-800 animate-pulse rounded-lg" />
          ))}
        </div>
      ) : history.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {history.map((item) => (
              <div key={item.id} className="relative group">
                <CardofCarouselMainCard data={item} />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${item.progress}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <IoTime className="w-16 h-16 text-gray-600 mb-4" />
          <h2 className="text-xl text-gray-400">No watch history yet</h2>
        </div>
      )}
    </LibraryLayout>
  );
}