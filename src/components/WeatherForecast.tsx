import React from 'react';
import { WeatherData } from '../types';
import { kelvinToCelsius } from '../utils/temperatureUtils';

interface WeatherForecastProps {
  loading: boolean;
  forecastData: WeatherData;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({
  loading,
  forecastData,
}) => {
  if (loading) {
    return (
      <div className="loader-container">
        <div>Load....</div>
      </div>
    );
  }

  if (!forecastData?.id) {
    return null;
  }

  return (
    <div>
      <div>
        <h3>{forecastData?.name}</h3>
      </div>
      <div>
        Temperature: {kelvinToCelsius(forecastData?.main?.temp)}°C
      </div>
      <div>
        <span>
          Feel Like: {kelvinToCelsius(forecastData?.main?.feels_like)}
          °C
        </span>
        <span>Humidity: {forecastData?.main?.humidity}</span>
        <span>Winds: {forecastData?.wind?.speed}</span>
      </div>
    </div>
  );
};

export default WeatherForecast;
