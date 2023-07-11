import axios from 'axios';

export function fetchWeatherData(
  latitude: number,
  longitude: number
) {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
      import.meta.env.VITE_OPENWEATHERMAP_API_KEY
    }`
  );
}
