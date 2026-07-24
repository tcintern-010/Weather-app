export default async function handler(req, res) {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: "City is required" });

  const apiKey = process.env.OPENWEATHER_API_KEY;
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const response = await fetch(apiUrl + encodeURIComponent(city) + `&appid=${apiKey}`);
  const data = await response.json();
  res.status(200).json(data);
}