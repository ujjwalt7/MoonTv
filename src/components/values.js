import { addToWatchlist } from "@/lib/auth";
import { ToastAction ,useToast } from "./ui/toast";
import Link from "next/link";

export const tmdbBasicImg = "https://image.tmdb.org/t/p/";
export const tmdbBasicImgOriginl = "https://image.tmdb.org/t/p/original/";

export const tags = [
  { name: "Action", id: 28 },
  { name: "Adventure", id: 12 },
  { name: "Animation", id: 16 },
  { name: "Comedy", id: 35 },
  { name: "Crime", id: 80 },
  { name: "Documentary", id: 99 },
  { name: "Drama", id: 18 },
  { name: "Family", id: 10751 },
  { name: "Fantasy", id: 14 },
  { name: "History", id: 36 },
  { name: "Horror", id: 27 },
  { name: "Music", id: 10402 },
  { name: "Mystery", id: 9648 },
  { name: "Romance", id: 10749 },
  { name: "Science Fiction", id: 878 },
  { name: "TV Movie", id: 10770 },
  { name: "Thriller", id: 53 },
  { name: "War", id: 10752 },
  { name: "Western", id: 37 },
  { name: "Action & Adventure", id: 10759 },
  { name: "Kids", id: 10762 },
  { name: "News", id: 10763 },
  { name: "Reality", id: 10764 },
  { name: "Sci-Fi & Fantasy", id: 10765 },
  { name: "Soap", id: 10766 },
  { name: "Talk", id: 10767 },
  { name: "War & Politics", id: 10768 },
];
export const addToWatchlistHandler = async ({
  user,
  movieId,
  movieType,
  setUser,
  toast
}) => {
  if (!user) {
    console.log("User not authenticated");
    toast({
      title: "User Not Logged In",
      description: "To add to WatchList Login/SignUp first!",
      action: (
        <ToastAction altText="Login">
          <Link href={"/login"}>Login</Link>
        </ToastAction>
      ),
    });
    return;
  }

  const timestamp = new Date().toISOString(); // You can use the current timestamp
  const { success, error } = await addToWatchlist(
    user.id,
    movieId,
    movieType,
    timestamp,
    setUser
  );

  if (success) {
    toast({
      title: "Watchlist Updated",
      description: "Movie added to watchlist!",
    });
  } else {
    toast({
      title: "Watchlist Error",
      description: `${error}`,
      variant: "destructive",
    });
  }
};