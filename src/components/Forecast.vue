<template>
  <forecast-skeleton v-if="weatherStore.isLoading"/>
  <div class="forecast" v-else>
    <div
        v-for="(day, index) in weatherStore.forecast"
        class="forecast_day"
    >
      <div class="forecast_day_week-day">
        <div v-if="index === 0">
          {{'Today'}}
        </div>
        <div v-else>
          {{(weekDays[new Date(day.date).getDay()])}}
        </div>
      </div>
      <img :src="day.icon" alt="icon">
      <span>{{day.maxTemperature}}</span>
      <span>{{day.minTemperature}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useWeatherStore} from "@/store/weather";
import ForecastSkeleton from "@/components/Skeletons/ForecastSkeleton.vue";

const weekDays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const weatherStore = useWeatherStore()
</script>

<style scoped lang="sass">
.forecast
  gap: 35px
  justify-content: space-between
  display: flex
  align-items: center
  padding: 20px 30px
  border-radius: 10px
  background-color: rgba(122, 92, 176, 0.5)
  box-shadow: 5px 10px 10px rgba(0,0,0,0.2)
  color: white
  overflow-y: auto
  height: 150px
  width: 100%
  max-width: 1020px
  min-width: 350px
  &_day
    min-width: 50px
    display: flex
    flex-direction: column
    align-items: center
    & img
      width: 45px
@media (max-width: 480px)
  .forecast
    gap: 35px
    justify-content: space-between
    display: flex
    align-items: center
    padding: 20px 30px
    border-radius: 10px
    background-color: rgba(122, 92, 176, 0.5)
    box-shadow: 5px 10px 10px rgba(0,0,0,0.2)
    color: white
    overflow-y: auto
    height: 150px
    width: 80%
    max-width: 1020px
    min-width: 350px
    &_day
      width: 50px
      display: flex
      flex-direction: column
      align-items: start
      & img
        width: 45px
</style>
