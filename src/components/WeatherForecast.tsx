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
        <div>Load....</div>
      </div>
    );
  }

  if (!forecastData?.id) {
    return null;
  }

  return <div className="forecast-container">{forecastData?.id}</div>;
};

export default WeatherForecast;
