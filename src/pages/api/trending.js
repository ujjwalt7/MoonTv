export default async function handler(req, res) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGE1MjQ3ZDdiNTRhZTgwYTk1MGNlMTA2YzA2OWM4NCIsIm5iZiI6MTczMDIzMTc5MC45MzgxNzE0LCJzdWIiOiI2NDk1ZTVkOGEyODRlYjAwYzViZDdkYzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.yAHv5vNA8ch758Ect4LQqGeXe6H1c-8YT1OUgCI2ZMw",
    },
  };

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US",
      options
    );
    const r = await response.json();

    const tempData = await Promise.all(
      r.results.map(async (e) => {
        try {
          const imgResponse = await fetch(
            `https://api.themoviedb.org/3/${e.media_type}/${e.id}/images`,
            options
          );
          const imgData = await imgResponse.json();
          const logo = imgData?.logos?.filter((l) => l.iso_639_1 === "en")[0] || null;
          return { ...e, logo };
        } catch (err) {
          console.error("Error fetching image logo:", err);
          return { ...e, logo: null };
        }
      })
    );

    res.status(200).json({ results: tempData });
  } catch (err) {
    console.error("Error fetching trending data:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
