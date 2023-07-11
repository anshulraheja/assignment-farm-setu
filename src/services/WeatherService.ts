import axios from 'axios';

const openWeatherMapApiKey = '895284fb2d2c50a520ea537456963d9c';

export function fetchWeatherData(
  latitude: number,
  longitude: number
) {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherMapApiKey}`
  );
}
