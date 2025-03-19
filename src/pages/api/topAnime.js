export default async function handler(req, res) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };
  
    const data = await fetch(
      `https://api.jikan.moe/v4/top/anime?type=${req.query?.type||"tv"}`,
      options
    )
      .then((res) => res.json())
      .catch((err) => console.error(err));
    res.status(200).json({ results:data });
  }
  