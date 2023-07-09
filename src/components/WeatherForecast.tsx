import React from 'react';
import { WeatherData } from '../types';

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
        <div>Loading....</div>
      </div>
    );
  }

  if (!forecastData?.id) {
    return null;
  }

  return <div className="forecast-container"></div>;
};

export default WeatherForecast;
