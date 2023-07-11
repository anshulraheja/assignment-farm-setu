import React from 'react';
import { GoogleMap, InfoWindow } from '@react-google-maps/api';
import { Location, WeatherData } from '../../types';
import { useJsApiLoader } from '@react-google-maps/api';
import { kelvinToCelsius } from '../../utils/temperatureUtils';
import './MapContainer.css';

interface MapContainerProps {
  loading: boolean;
  location: Location | null;
  forecastData: WeatherData;
}

const containerStyle = {
  width: '100%',
  height: '400px',
  marginBottom: '2rem',
};

const MapContainer: React.FC<MapContainerProps> = ({
  loading,
  location,
  forecastData,
}) => {
  const currentPosition = {
    lat: location?.latitude || 0,
    lng: location?.longitude || 0,
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCkKvA0IfBa2EVsB5ZReTBBakTQLmWk6kc',
  });

  if (loading || !location) {
    return <div className="loader-container">Please wait....</div>;
  }

  if (!location) {
    return <div>No location found for the search query.</div>;
  }

  return isLoaded ? (
    <div className="map-container">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
      >
        {forecastData && (
          <InfoWindow position={currentPosition}>
            <div>
              <div>
                Temperature:{' '}
                {kelvinToCelsius(forecastData?.main?.temp)}°C
              </div>
              <div>
                Precipitation: {forecastData?.main?.humidity}%
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : (
    <>No google map</>
  );
};

export default MapContainer;
