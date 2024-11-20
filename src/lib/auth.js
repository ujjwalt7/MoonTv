import { ToastAction } from "@radix-ui/react-toast";
import { supabase } from "./supabaseClient";
import Link from "next/link";

export const signInWithEmail = async (email, password, setUser) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (data?.user) {
    console.log("Logged In");
    const { data: userRecord, error: fetchError } = await getUserFromDB(
      data.user.id
    );
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
  const { error: dbError } = await supabase.from("users").insert([
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

export const addToWatchlist = async (
  userId,
  movieId,
  movieType,
  timestamp,
  setUser
) => {
  
  // Fetch the current user data
  const { data, error } = await supabase
    .from("users")
    .select("watchlist")
    .eq("auth_user_id", userId)
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
    .from("users")
    .update({ watchlist: updatedWatchlist })
    .eq("auth_user_id", userId);

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

// Function to add a movie or TV show to the user's watch history
export const addToWatchHistory = async ({
  userId,
  movieId,
  mediaType,
  timestamp,
  title,
  posterUrl,
  setUser,
}) => {
  // Fetch current user history from the database
  const { data: userData, error: fetchError } = await supabase
    .from("users")
    .select("history")
    .eq("auth_user_id", userId)
    .single();

  if (fetchError) {
    console.error("Error fetching user history:", fetchError);
    return { success: false, error: fetchError };
  }

  // Check if the movie/show is already in the history
  const movieExists = userData.history.some((item) => item.movieId === movieId);

  // If the movie/show already exists, return a message indicating it's already in history
  if (movieExists) {
    console.log("Movie/TV show already in history.");
    return { success: true, message: "Already in history" };
  }

  // Prepare the new entry for the watch history
  const newHistoryEntry = {
    movieId,
    mediaType,
    timestamp,
    title,
    posterUrl,
  };

  // Add the new entry to the history array
  const updatedHistory = [...userData.history, newHistoryEntry];

  // Update the history in the database
  const { error: updateError } = await supabase
    .from("users")
    .update({ history: updatedHistory })
    .eq("auth_user_id", userId);

  if (updateError) {
    console.error("Error updating user history:", updateError);
    return { success: false, error: updateError };
  }

  // Update local state (user history) as well
  setUser((prevState) => ({
    ...prevState,
    history: updatedHistory,
  }));

  return { success: true };
};
export const getSignedInUserData = async () => {
  try {
    // Get the current session (signed-in user)
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      console.error("Error fetching session:", sessionError);
      return { success: false, error: "User is not logged in." };
    }

    // Fetch user data from the `users` table based on the session user ID
    const { data: userData, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("auth_user_id", session.user.id)
      .single(); // Get only one user record

    if (fetchError) {
      console.error("Error fetching user data:", fetchError);
      return { success: false, error: fetchError.message };
    }

    // Return the user data
    return { success: true, userData };
  } catch (error) {
    console.error("Unexpected error fetching user data:", error);
    return { success: false, error: error.message };
  }
};