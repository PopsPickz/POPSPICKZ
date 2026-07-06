// ===========================
// POPS Pickz Weather API
// ===========================

const stadiumWeatherMap = {
  "Kauffman Stadium": { lat: 39.0517, lon: -94.4803 },
  "George M. Steinbrenner Field": { lat: 27.9799, lon: -82.5067 },
  "Nationals Park": { lat: 38.8730, lon: -77.0074 },
  "Truist Park": { lat: 33.8908, lon: -84.4678 },
  "Busch Stadium": { lat: 38.6226, lon: -90.1928 },
  "Petco Park": { lat: 32.7073, lon: -117.1566 },
  "Oracle Park": { lat: 37.7786, lon: -122.3893 },
  "Dodger Stadium": { lat: 34.0739, lon: -118.2400 }
};

async function getGameWeather(venueName, gameDate) {
  const venue = stadiumWeatherMap[venueName];

  if (!venue) {
    return { temp: "N/A", wind: "N/A", note: "Weather unavailable" };
  }

  const url = ⁠ https://api.open-meteo.com/v1/forecast?latitude=${venue.lat}&longitude=${venue.lon}&hourly=temperature_2m,wind_speed_10m,wind_direction_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto ⁠;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.hourly || !data.hourly.time) {
      return { temp: "N/A", wind: "N/A", note: "Weather unavailable" };
    }

    const gameHour = new Date(gameDate).getHours();

    const index = data.hourly.time.findIndex(t => {
      const hour = new Date(t).getHours();
      return hour === gameHour;
    });

    if (index === -1) {
      return { temp: "N/A", wind: "N/A", note: "Weather time unavailable" };
    }

    return {
      temp: Math.round(data.hourly.temperature_2m[index]) + "°F",
      wind: Math.round(data.hourly.wind_speed_10m[index]) + " mph",
      direction: Math.round(data.hourly.wind_direction_10m[index]) + "°",
      note: "Auto weather"
    };
  } catch (err) {
    return { temp: "N/A", wind: "N/A", note: "Weather error" };
  }
}
