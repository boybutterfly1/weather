import {defineStore} from "pinia";
import {ref} from "vue";
import apiWeather from '@/api/weather'
import {CurrentT, ForecastT, LocationT} from "@/types/types";
import {AxiosResponse} from "axios";

interface ForecastDayT {
  date_epoch: number,
  day: {
    condition: {
      icon: string;
    },
    maxtemp_c: number,
    mintemp_c: number,
  }
}

export const useWeatherStore = defineStore('weather', () => {
  const location = ref<LocationT>({
    name: '',
    localtime: ''
  })
  const current = ref<CurrentT>({
    temperature: 0,
    feelsLike: 0,
    condition: '',
    icon: '',
    windSpeed: 0,
    pressure: 0,
    humidity: 0
  })
  const forecast = ref<ForecastT[]>([])

  const defaultParameters = ref({
    location: 'Moscow',
    mapCenter: [37.617644, 55.755819]
  })

  const mapCenter = ref<number[]>(defaultParameters.value.mapCenter)

  const isLoading = ref(true)
  const searchQuery = ref<string>('')
  const userCoordinates = ref<number[] | null>(null)

  async function getUserCoordinates(): Promise<number[]> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const coordinates: number[] = [position.coords.longitude, position.coords.latitude]
          userCoordinates.value = coordinates
          mapCenter.value = userCoordinates.value
          resolve(coordinates);
        }, (error) => {
          reject(error);
        });
      } else {
        reject('Геолокация не поддерживается в вашем браузере.');
      }
    });
  }
  async function fetchForecast() {
    try {
      isLoading.value = true
      const response: AxiosResponse = await new Promise((resolve) => {
        setTimeout(async () => {
          if (searchQuery.value) {
            const data = await apiWeather.getForecast(searchQuery.value)
            resolve(data)
          } else if (userCoordinates.value) {
            const data = await apiWeather.getForecast([...userCoordinates.value].reverse().join(','))
            resolve(data)
          } else {
            const data = await apiWeather.getForecast(defaultParameters.value.location)
            resolve(data)
          }
        }, 3000)
      })
      location.value.name = response.data.location.name
      location.value.localtime = new Date().toDateString()

      current.value.temperature = response.data.current.temp_c
      current.value.feelsLike = response.data.current.feelslike_c
      current.value.condition = response.data.current.condition.text
      current.value.icon = response.data.current.condition.icon
      current.value.windSpeed = response.data.current.wind_kph
      current.value.pressure = response.data.current.pressure_mb
      current.value.humidity = response.data.current.humidity

      forecast.value = []
      response.data.forecast.forecastday.forEach((day: ForecastDayT) => {
        const newForecastItem: ForecastT = {
          date: day.date_epoch * 1000,
          icon: day.day.condition.icon,
          maxTemperature: day.day.maxtemp_c,
          minTemperature: day.day.mintemp_c
        }
        forecast.value.push(newForecastItem)
      })

    } catch (e) {
      console.log(e)
    } finally {
      isLoading.value = false
    }
  }
  async function handleSearch() {
    const response = await apiWeather.getCoordinates(searchQuery.value)
    mapCenter.value = [response.data[0].lat, response.data[0].lon].reverse()
    await fetchForecast()
  }

  return {
    location,
    current,
    forecast,
    mapCenter,
    isLoading,
    searchQuery,
    userCoordinates,
    fetchForecast,
    handleSearch,
    getUserCoordinates
  }
})