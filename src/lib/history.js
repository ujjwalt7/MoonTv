import { supabase } from "./supabase";

export async function addToHistory(userId, mediaId, mediaType, title, posterUrl, mediaData) {
  try {
    const { data, error } = await supabase
      .from('watch_history')
      .upsert({
        user_id: userId,
        media_id: mediaId,
        media_type: mediaType,
        watched_at: new Date(),
        title: title,
        poster_url: posterUrl,
        media_data: mediaData, // Add this line to store media data
        watch_progress: 0
      });

    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function addToWatchHistory(userId, mediaId, mediaType, timestamp, title, posterUrl, setUser) {
    try {
        const { data, error } = await supabase
            .from('watch_history')
            .upsert({
                user_id: userId,
                media_id: mediaId,
                media_type: mediaType,
                watched_at: timestamp,
                title: title,
                poster_url: posterUrl,
                watch_progress: 0
            });

        if (error) throw error;
        return { success: true, error: null, message: "Added to watch history!" };
    } catch (error) {
        return { success: false, error: error.message };
    }
}