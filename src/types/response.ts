export interface IForecastDay {
  date_epoch: number,
  day: {
    condition: {
      icon: string;
    },
    maxtemp_c: number,
    mintemp_c: number,
  }
}

export interface ICoordinates {
  country: string
  id: number
  lat: number
  lon: number
  name: string
  region: string
  url: string
}