export default async function handler(req, res) {
  const { query } = req.query;
  if (!query) return res.status(200).json([]);

  const apiKey = process.env.OPENWEATHER_API_KEY;
  const geoUrl = "https://api.openweathermap.org/geo/1.0/direct";

  const response = await fetch(`${geoUrl}?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`);
  const data = await response.json();
  res.status(200).json(data);
}