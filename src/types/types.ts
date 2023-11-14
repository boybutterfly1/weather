export interface LocationT {
  name: string,
  localtime: string,
}
export interface CurrentT {
  temperature: number,
  feelsLike: number,
  condition: string,
  icon: string,
  windSpeed: number,
  pressure: number,
  humidity: number
}
export interface ForecastT {
  date: number
  icon: string,
  maxTemperature: number,
  minTemperature: number
}