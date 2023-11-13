import api from "@/api/api";
import {WEATHER_API_KEY} from "@/api/constants";

export default {
  getForecast(q: string) {
    const params = {
      q,
      days: 7,
      key: WEATHER_API_KEY,
    }
    return api.get('forecast.json', {params})
  },
  getCoordinates(q: string) {
    const params = {
      q,
      key: WEATHER_API_KEY,
    }
    return api.get('search.json', {params})
  }
}