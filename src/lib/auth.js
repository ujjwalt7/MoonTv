import { supabase } from "./supabaseClient";

export const signInWithEmail = async (email, password, setUser) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (data?.user) {
    console.log("Logged In");
    const { data: userRecord, error: fetchError } = await getUserFromDB(data.user.id);
    if (fetchError) {
      console.error("User data fetch error:", fetchError);
      return { user: data.user, error: null, dbError: fetchError };
    } else {
      setUser({ ...data.user, ...userRecord });
      return { user: data.user, error: null };
    }
  } else {
    console.error("Sign-in error:", error);
    return { user: null, error };
  }
};

export const signUpWithEmail = async (email, password, setUser) => {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (data?.user) {
    console.log("Account Created");
    const { error: dbError } = await addUserToDB(data.user.id, data.user.email);
    if (dbError) {
      console.error("Database entry error:", dbError);
      return { user: data.user, error: null, dbError };
    } else {
      setUser({ ...data.user, watchlist: [], history: [] });
      return { user: data.user, error: null };
    }
  } else {
    console.error("Sign-up error:", error);
    return { user: null, error };
  }
};

export const addUserToDB = async (authUserId, email) => {
  const { error: dbError } = await supabase
    .from("users")
    .insert([
      {
        auth_user_id: authUserId,
        email,
        watchlist: [],
        history: [],
      },
    ]);
  if (dbError) {
    console.error("Error inserting user to DB:", dbError);
  }
  return { error: dbError };
};

export const getUserFromDB = async (authUserId) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("auth_user_id", authUserId)
    .single();

  if (error) {
    console.error("Error fetching user from DB:", error);
  }
  return { data, error };
};


export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};



export const addToWatchlist = async (userId, movieId, movieType, timestamp, setUser) => {
  // Fetch the current user data
  const { data, error } = await supabase
    .from('users')
    .select('watchlist')
    .eq('auth_user_id', userId)
    .single();

  if (error) {
    console.error("Error fetching user data:", error);
    return { success: false, error: error.message };
  }

  // If the user doesn't have a watchlist yet, initialize it
  const currentWatchlist = data?.watchlist || [];

  // Add the new movie/show to the watchlist
  const newMovie = {
    id: movieId,
    media_type: movieType,
    timestamp,
  };

  // Update the watchlist by appending the new movie
  const updatedWatchlist = [...currentWatchlist, newMovie];

  // Update the user's record in the database with the new watchlist
  const { error: updateError } = await supabase
    .from('users')
    .update({ watchlist: updatedWatchlist })
    .eq('auth_user_id', userId);

  if (updateError) {
    console.error("Error updating watchlist:", updateError);
    return { success: false, error: updateError.message };
  }

  // Optionally update the local user state (if you want to keep the UI in sync)
  setUser((prevUser) => ({
    ...prevUser,
    watchlist: updatedWatchlist,
  }));

  return { success: true };
};
