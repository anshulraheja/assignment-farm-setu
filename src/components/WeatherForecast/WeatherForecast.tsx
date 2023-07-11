import React from 'react';
import { kelvinToCelsius } from '../../utils/temperatureUtils';
import './WeatherForecast.css';

interface WeatherForecastProps {
  loading: boolean;
  forecastData: any;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({
  loading,
  forecastData,
}) => {
  if (loading) {
    return (
      <div className="loader-container">
        <div>Loading...</div>
      </div>
    );
  }

  if (!forecastData?.id) {
    return null;
  }

  return (
    <div className="weather-forecast">
      <div className="weather-heading">
        <h3>{forecastData?.name}</h3>
      </div>
      <div className="weather-details">
        <div className="weather-temperature">
          Temperature: {kelvinToCelsius(forecastData?.main?.temp)}°C
        </div>
        <div className="weather-info">
          <div>
            Feels Like:{' '}
            {kelvinToCelsius(forecastData?.main?.feels_like)}°C
          </div>
          <div>Humidity: {forecastData?.main?.humidity} %</div>
          <div>Wind: {forecastData?.wind?.speed} m/s</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;
