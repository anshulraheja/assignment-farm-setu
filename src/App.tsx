import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WeatherForecast from './components/WeatherForecast';
import MapContainer from './components/MapContainer';
import { Location, WeatherData } from './types';
import './App.css';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [forecastData, setForecastData] = useState<WeatherData>();

  const openWeatherMapApiKey = '895284fb2d2c50a520ea537456963d9c';
  const googleMapsApiKey = 'AIzaSyCkKvA0IfBa2EVsB5ZReTBBakTQLmWk6kc';

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
          setLoading(false);
        },
        (error) => {
          toast.error('Failed to retrieve location.');
          console.error(error);
          setLoading(false);
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (location) {
      setLoading(true);

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${openWeatherMapApiKey}`
        )
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
      <div className="wrapper">
        <h1 className="header">Weather App</h1>
        <WeatherForecast
          loading={loading}
          forecastData={forecastData}
        />
      </div>
      <MapContainer
        loading={loading}
        location={location}
        googleMapsApiKey={googleMapsApiKey}
        forecastData={forecastData}
      />
      <ToastContainer />
    </div>
  );
};

export default App;
