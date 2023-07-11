import React from 'react';
import { render, screen } from '@testing-library/react';
import MapContainer from '../components/MapContainer';

describe('MapContainer', () => {
  it('should display loading message when loading prop is true', () => {
    render(
      <MapContainer
        loading={true}
        location={null}
        forecastData={null}
      />
    );

    const loadingMessage = screen.getByText(/Please wait/i);
    expect(loadingMessage).toBeInTheDocument();
  });

  it('should display map container when loading prop is false and location is provided', () => {
    const location = {
      latitude: 37.7749,
      longitude: -122.4194,
    };

    render(
      <MapContainer
        loading={false}
        location={location}
        forecastData={null}
      />
    );

    const mapContainer = screen.getByTestId('map-container');
    expect(mapContainer).toBeInTheDocument();
  });

  it('should not render anything when location is null', () => {
    render(
      <MapContainer
        loading={false}
        location={null}
        forecastData={null}
      />
    );

    const mapContainer = screen.queryByTestId('map-container');
    expect(mapContainer).toBeNull();
  });
});
