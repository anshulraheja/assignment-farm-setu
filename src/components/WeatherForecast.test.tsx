import React from 'react';
import { render } from '@testing-library/react';
import WeatherForecast from './WeatherForecast';

test('renders WeatherForecast component', () => {
  render(<WeatherForecast loading={false} forecastData={null} />);
});
