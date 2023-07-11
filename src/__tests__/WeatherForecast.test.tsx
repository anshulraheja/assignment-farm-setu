import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherForecast from '../components/WeatherForecast/WeatherForecast';

describe('WeatherForecast', () => {
  it('should display loading message when loading prop is true', () => {
    render(<WeatherForecast loading={true} forecastData={null} />);

    const loadingMessage = screen.getByText(/Load.../i);
    expect(loadingMessage).toBeInTheDocument();
  });

  it('should display weather forecast information when loading prop is false and forecastData is provided', () => {
    const forecastData = {
      id: 1,
      name: 'City Name',
      main: {
        temp: 300,
        feels_like: 295,
        humidity: 50,
      },
      wind: {
        speed: 10,
      },
    };

    render(
      <WeatherForecast loading={false} forecastData={forecastData} />
    );

    const cityName = screen.getByText(/City Name/i);
    const temperature = screen.getByText(/Temperature: 26.85°C/i);
    const feelsLike = screen.getByText(/Feels Like: 21.85°C/i);
    const humidity = screen.getByText(/Humidity: 50/i);
    const winds = screen.getByText(/Winds: 10/i);

    expect(cityName).toBeInTheDocument();
    expect(temperature).toBeInTheDocument();
    expect(feelsLike).toBeInTheDocument();
    expect(humidity).toBeInTheDocument();
    expect(winds).toBeInTheDocument();
  });

  it('should not render anything when forecastData is null', () => {
    render(<WeatherForecast loading={false} forecastData={null} />);

    const weatherForecast = screen.queryByTestId('weather-forecast');
    expect(weatherForecast).toBeNull();
  });
});
