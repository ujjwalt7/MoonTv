export default async function handler(req, res) {
  const { type, id } = req.query;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?language=en-US`,
      options
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching media details:', error);
    res.status(500).json({ error: 'Failed to fetch media details' });
  }
}