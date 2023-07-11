import React from 'react';
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  OverlayView,
} from '@react-google-maps/api';
import { Location, WeatherData } from '../types';
import { useJsApiLoader } from '@react-google-maps/api';
import { kelvinToCelsius } from '../utils/temperatureUtils';

const divStyle = {
  padding: '5px',
};
interface MapContainerProps {
  loading: boolean;
  location: Location | null;
  forecastData: WeatherData;
}

const containerStyle = {
  width: '100%',
  height: '600px',
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
    return <div>Please wait....</div>;
  }

  if (!location) {
    return <div>No location found for the search query.</div>;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentPosition}
      zoom={15}
    >
      <InfoWindow position={currentPosition}>
        <div style={divStyle}>
          <div>
            <div>
              Temp: {kelvinToCelsius(forecastData?.main?.temp)} °C
            </div>
            <div>Precipitation: {forecastData?.main?.humidity} %</div>
          </div>
        </div>
      </InfoWindow>
    </GoogleMap>
  ) : (
    <>No google map</>
  );
};

export default MapContainer;
