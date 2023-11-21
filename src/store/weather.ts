import { defineStore } from "pinia";
import { ref } from "vue";
import apiWeather from '@/api/weather'
import { CurrentT, ForecastT, LocationT } from "@/types/types";
import { AxiosResponse } from "axios";
import { ICoordinates, IForecastDay } from "@/types/response";

export const useWeatherStore = defineStore('weather', () => {
  const location = ref<LocationT>({} as LocationT)
  const current = ref<CurrentT>({} as CurrentT)
  const forecast = ref<ForecastT[]>([])

  const defaultParameters = ref({
    location: 'Moscow',
    mapCenter: [37.617644, 55.755819]
  })

  let inputTimer: number
  const isLoading = ref(true)
  const isSearchResults = ref(false)
  const searchQuery = ref<string>('')
  const searchResults = ref<ICoordinates[]>([])


  function handleInput() {
    if (inputTimer) {
      clearTimeout(inputTimer)
    }

    inputTimer = setTimeout(async () => {
      if (searchQuery.value) {
        const response = await apiWeather.getCoordinates(searchQuery.value)
        isSearchResults.value = true
        searchResults.value = response.data
      } else {
        isSearchResults.value = false
        searchResults.value = []
      }
    }, 500)
  }

  function getUserLocation(): Promise<Record<string, number>> {
    console.log('getUserLocation')
    return new Promise( (resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const {latitude, longitude} = position.coords;
            resolve({latitude, longitude});
          },
          (error) => {
            reject(`Ошибка при получении геолокации: ${error.message}`);
          }
        )
      } else {
        reject('Геолокация не поддерживается в этом браузере.')
      }
    })
  }

  async function fetchWeather(coordinates?: Record<string, number>) {
    console.log('fetchWeather')
    isLoading.value = true
    try {
      let response: AxiosResponse

      if (coordinates) {
        response = await apiWeather.getForecast(Object.values(coordinates).join(','))
      } else {
        response = await apiWeather.getForecast(defaultParameters.value.location)
      }

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
      response.data.forecast.forecastday.forEach((day: IForecastDay) => {
        const newForecastItem: ForecastT = {
          date: day.date_epoch * 1000,
          icon: day.day.condition.icon,
          maxTemperature: day.day.maxtemp_c,
          minTemperature: day.day.mintemp_c
        }
        forecast.value.push(newForecastItem)
      })

      isLoading.value = false
    } catch (e) {
      console.error(e)
    }
  }

  function handleUserLocation() {
    console.log('handleUserLocation')
    isLoading.value = true
      getUserLocation()
      .then((location) => {
        console.log(location)
        fetchWeather(location).catch((e) => console.log(e))
        defaultParameters.value.mapCenter = Object.values(location).reverse()
      })
      .catch(() => fetchWeather())
  }

  return {
    location,
    current,
    forecast,
    isLoading,
    isSearchResults,
    defaultParameters,
    searchQuery,
    searchResults,
    fetchWeather,
    handleInput,
    handleUserLocation,
  }
})