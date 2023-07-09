import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  GoogleMap,
  LoadScript,
  Marker,
} from '@react-google-maps/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Location {
  latitude: number;
  longitude: number;
}

interface DailyForecast {
  dt: number;
  temp: {
    day: number;
  };
  pop: number;
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center: google.maps.LatLngLiteral = {
  lat: 0,
  lng: 0,
};

const App: React.FC = () => {
  const apiKey = '895284fb2d2c50a520ea537456963d9c'; //'b110c67631fe4e360321609e59593b18';
  const googleMapsApiKey = 'AIzaSyCkKvA0IfBa2EVsB5ZReTBBakTQLmWk6kc';

  const [loading, setLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [forecastData, setForecastData] = useState<DailyForecast[]>(
    []
  );
  const [historicalData, setHistoricalData] = useState<any[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          toast.error('Failed to retrieve location.');
          console.error(error);
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location;

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        )
        .then((response) => {
          setForecastData(response.data.daily);
          setLoading(false);
        })
        .catch((error) => {
          toast.error('Failed to retrieve forecast data.');
          console.error(error);
          setLoading(false);
        });

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        )
        .then((response) => {
          setHistoricalData(response.data.list);
          setLoading(false);
        })
        .catch((error) => {
          toast.error('Failed to retrieve historical data.');
          console.error(error);
          setLoading(false);
        });
    }
  }, [location, apiKey]);

  const renderForecast = (): JSX.Element => {
    if (loading) {
      return (
        <div className="loader-container">
          <div>Loading....</div>
        </div>
      );
    }

    return (
      <div className="forecast-container">
        <h2>Daily Forecast</h2>
        <ul>
          {forecastData.map((day: DailyForecast, index: number) => (
            <li key={index}>
              <p>
                Date: {new Date(day.dt * 1000).toLocaleDateString()}
              </p>
              <p>Temperature: {day.temp.day} &#8451;</p>
              <p>Precipitation: {day.pop * 100}%</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderMap = (): JSX.Element | null => {
    if (loading || (!location && searchQuery === '')) {
      return null;
    }

    if (searchQuery !== '' && !location) {
      return <div>No location found for the search query.</div>;
    }

    return (
      <div className="map-container">
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={location || center}
            zoom={12}
          >
            {location && <Marker position={location} />}
          </GoogleMap>
        </LoadScript>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search location..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      {renderForecast()}
      {renderMap()}
      <ToastContainer />
    </div>
  );
};

export default App;
