<template>
  <current-weather-skeleton v-if="weatherStore.isLoading"/>
  <div class="current-weather" v-else>
    <div class="current-weather_location">
      <span class="current-weather_location_name">{{weatherStore.location.name}}</span>
      <span class="current-weather_location_date">{{weatherStore.location.localtime}}</span>
    </div>
    <div class="current-weather_current">
      <span class="current-weather_current_temperature">{{weatherStore.current.temperature + '°'}}</span>
      <img :src="weatherStore.current.icon" alt="icon">
      <div class="current-weather_current_description">
        <span class="current-weather_current_description_condition">{{weatherStore.current.condition}}</span>
        <span class="current-weather_current_description_feels-like">{{'Feels like ' + weatherStore.current.feelsLike + '°'}}</span>
      </div>
    </div>
    <div class="current-weather_other-parameters">
      <div class="current-weather_other-parameters_parameter">
        <img src="https://img.icons8.com/sf-regular/30/ffffff/wind.png" alt="wind--v1"/>
        <span>{{weatherStore.current.windSpeed + ' km/h'}}</span>
      </div>
      <div class="current-weather_other-parameters_parameter">
        <img src="https://img.icons8.com/sf-regular/30/ffffff/wet.png" alt="wind--v1"/>
        <span>{{weatherStore.current.humidity + '%'}}</span>
      </div>
        <div class="current-weather_other-parameters_parameter">
          <img src="https://img.icons8.com/sf-regular/30/ffffff/barometer-gauge.png" alt="wind--v1"/>
          <span>{{weatherStore.current.pressure + ' mb'}}</span>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useWeatherStore} from "@/store/weather";
import CurrentWeatherSkeleton from "@/components/Skeletons/CurrentWeatherSkeleton.vue";
const weatherStore = useWeatherStore()

weatherStore.fetchForecast()
</script>

<style scoped lang="sass">
.current-weather
  display: flex
  flex-direction: column
  align-items: center
  gap: 10px
  width: 500px
  height: 300px
  padding: 20px 50px 30px
  border-radius: 10px
  background-color: rgba(122, 92, 176, 0.5)
  box-shadow: 5px 10px 10px rgba(0,0,0,0.2)
  color: white
  &_location
    display: flex
    flex-direction: column
    align-self: center
    align-items: center
    &_name
      font-size: 45px
      font-weight: 500
    &_date
      font-size: 25px
      font-weight: 300
  &_current
    display: flex
    align-items: center
    gap: 15px
    &_temperature
      font-size: 70px
      font-weight: 500
    &_description
      display: flex
      flex-direction: column
      &_condition
        font-size: 25px
        font-weight: 400
      &_feels-like
        font-size: 25px
        font-weight: 300
  &_other-parameters
    display: flex
    gap: 25px
    font-size: 20px
    font-weight: 400
    &_parameter
      display: flex
      align-items: center
      & img
        width: 25px
        margin-right: 5px
@media (max-width: 480px)
  .current-weather
    display: flex
    flex-direction: column
    align-items: center
    gap: 10px
    width: 350px
    height: 250px
    padding: 15px 40px 20px
    border-radius: 10px
    background-color: rgba(122, 92, 176, 0.5)
    box-shadow: 5px 10px 10px rgba(0,0,0,0.2)
    color: white
    &_location
      display: flex
      flex-direction: column
      align-self: center
      align-items: center
      &_name
        font-size: 35px
        font-weight: 500
      &_date
        font-size: 15px
        font-weight: 300
    &_current
      display: flex
      align-items: center
      gap: 7px
      &_temperature
        font-size: 60px
        font-weight: 500
      &_description
        display: flex
        flex-direction: column
        &_condition
          font-size: 17px
          font-weight: 400
        &_feels-like
          font-size: 17px
          font-weight: 300
    &_other-parameters
      display: flex
      gap: 20px
      font-size: 15px
      font-weight: 400
      &_parameter
        display: flex
        align-items: center
        & img
          width: 17px
          margin-right: 5px
</style>
