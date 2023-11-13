<template>
  <navbar/>
  <div class="weather">
    <div class="weather_upper-content">
      <suspense>
        <template #default>
          <current-weather/>
        </template>
        <template #fallback>
          <current-weather-skeleton/>
        </template>
      </suspense>
      <Map/>
    </div>
    <forecast/>
  </div>
</template>

<script setup lang="ts">
import CurrentWeather from '@/components/CurrentWeather.vue'
import CurrentWeatherSkeleton from "@/components/Skeletons/CurrentWeatherSkeleton.vue";
import Map from "@/components/Map.vue";
import Forecast from "@/components/Forecast.vue";
import Navbar from "@/components/Navbar.vue";
</script>

<style scoped lang="sass">
.weather
  padding: 20px
  display: flex
  flex-direction: column
  align-items: center
  gap: 20px
  &_upper-content
    display: flex
    justify-content: center
    flex-wrap: wrap
    gap: 20px
</style>
