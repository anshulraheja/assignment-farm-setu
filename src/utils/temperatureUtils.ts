export function kelvinToCelsius(temperature: number): number {
  const celsius = temperature - 273.15;
  return parseFloat(celsius.toFixed(2));
}
