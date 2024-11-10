export default async function handler(req, res) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGE1MjQ3ZDdiNTRhZTgwYTk1MGNlMTA2YzA2OWM4NCIsIm5iZiI6MTczMDIzMTc5MC45MzgxNzE0LCJzdWIiOiI2NDk1ZTVkOGEyODRlYjAwYzViZDdkYzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.yAHv5vNA8ch758Ect4LQqGeXe6H1c-8YT1OUgCI2ZMw",
    },
  };

  const data = await fetch(
    `https://api.themoviedb.org/3/trending/${req.query?.type}/day?language=en-US`,
    options
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
  res.status(200).json({ results:data });
}
