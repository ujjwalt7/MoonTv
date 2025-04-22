import { supabase } from "./supabase";

export async function isInWatchlist(userId, mediaId, mediaType) {
  try {
    const { data, error } = await supabase
      .from('watchlist')
      .select('*')
      .eq('user_id', userId)
      .eq('media_id', mediaId)
      .eq('media_type', mediaType)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return { exists: !!data, error: null };
  } catch (error) {
    console.error('Error checking watchlist:', error);
    return { exists: false, error: error.message };
  }
}

export async function addToWatchlist(userId, movieId, movieType, timestamp, setUser, mediaData) {
  try {
    const { data, error } = await supabase
      .from('watchlist')
      .insert([
        {
          user_id: userId,
          media_id: movieId,
          media_type: movieType,
          added_at: timestamp,
          media_data: mediaData // <-- store the full JSON here
        }
      ]);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    return { success: false, error: error.message };
  }
}