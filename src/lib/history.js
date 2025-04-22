import { supabase } from "./supabase";

export async function addToHistory(userId, mediaId, mediaType) {
  try {
    const { data, error } = await supabase
      .from('watch_history')
      .upsert({ 
        user_id: userId,
        media_id: mediaId,
        media_type: mediaType,
        watched_at: new Date(),
        watch_progress: 0
      });

    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
}