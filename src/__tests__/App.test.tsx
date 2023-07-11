import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('should render the WeatherForecast and MapContainer components', () => {
    render(<App />);

    const weatherForecast = screen.getByTestId('weather-forecast');
    const mapContainer = screen.getByTestId('map-container');

    expect(weatherForecast).toBeInTheDocument();
    expect(mapContainer).toBeInTheDocument();
  });
});
