import React from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
} from '@react-google-maps/api';
import { Location } from '../types';

interface MapContainerProps {
  loading: boolean;
  location: Location | null;
  searchQuery: string;
  googleMapsApiKey: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center: Location = {
  latitude: 0,
  longitude: 0,
};

const MapContainer: React.FC<MapContainerProps> = ({
  loading,
  location,
  searchQuery,
  googleMapsApiKey,
}) => {
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

export default MapContainer;
