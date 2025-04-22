export default async function handler(req, res) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/top/anime?type=${req.query?.type || "tv"}`,
      options
    );
    const json = await response.json();

    const transformedResults = json.data.map((item) => {
      return {
        backdrop_path: item.trailer?.images?.maximum_image_url || null,
        id: item.mal_id,
        name: item.title_english || item.title || "",
        original_name: item.title || "",
        overview: item.synopsis || "",
        poster_path: item.images?.jpg?.image_url || null,
        media_type: "anime",
        adult: item.rating?.includes("R") || false,
        original_language: "ja",
        genre_ids: item.genres.map((g) => g.mal_id),
        popularity: item.popularity,
        first_air_date: item.aired?.from ? item.aired.from.split("T")[0] : null,
        vote_average: item.score || 0,
        vote_count: item.scored_by || 0,
        origin_country: ["JP"],
        logo: {
          aspect_ratio: null,
          height: null,
          iso_639_1: "en",
          file_path: item.trailer?.images?.maximum_image_url || null,
          vote_average: null,
          vote_count: null,
          width: null,
        },
      };
    });

    res.status(200).json({ results: transformedResults });
  } catch (err) {
    console.error("Error fetching Site B data:", err);
    res.status(500).json({ error: "Failed to fetch Site B data" });
  }
}
