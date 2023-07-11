import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WeatherForecast from './components/WeatherForecast/WeatherForecast.tsx';
import MapContainer from './components/MapContainer/MapContainer.tsx';
import { Location } from './types';
import { fetchWeatherData } from './services/WeatherService.ts';
import './App.css';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [forecastData, setForecastData] = useState<any>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('position', position);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          toast.error('Failed to retrieve location.');
          console.error(error);
          setLoading(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (location) {
      setLoading(true);
      fetchWeatherData(location.latitude, location.longitude)
        .then((response) => {
          console.log('weather data', response.data);
          setForecastData(response.data);
        })
        .catch((error) => {
          toast.error('Failed to retrieve forecast data.');
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [location]);

  return (
    <div className="container">
      <h1>Weather App</h1>
      <WeatherForecast
        loading={loading}
        forecastData={forecastData}
      />
      <MapContainer
        loading={loading}
        location={location}
        forecastData={forecastData}
      />
      <ToastContainer className="toast-container" />
    </div>
  );
};

export default App;
