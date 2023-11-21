<template>
  <nav class="navbar">
    <div class="navbar_logo">
      <span>Weather</span>
    </div>
    <div class="navbar_options">
      <div
          class="navbar_options_current-location"
          @click="weatherStore.handleUserLocation"
      >
        <span>Show my current location</span>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABw0lEQVR4nOXWO2jWUBTA8VjsIIIU3yC0KIpCN0ERF11EutRZB11cnAQdnAQfi6iLi+IDpQgKLu3QSQdnBwcRQRexm5uvKr5/cuUEw0di0n5JB/1Dhpx77/nnJufe3Cz7r8Fi7MIODCyk+IE/zOA0NnQtXRbCj/hSeICfeIiDWNqFeBBv8BhHe+Q573AdO9uWXwnBBYzhs2pe4BRG2hBvj6Sv4w3UyRM/ojbSp1jSj/xJJByP+ybynPSprmLrfMTHI8lkITYXec4znMCqpuI1+BrX6kJ8vKLg6kgPfA+jTeRTMehYT3y+8nyZrqsT7/vdlaclbf3I99aJB6OyE9taks+kTarJ674YAy5XtDeVz+I8VtZKI/FoDHxbtT5rqv0DLmFtI2FP4keRZP9f+hwu2VbPYsWchTk4EsnuZxVgIvq8xzksz/oFQ/gU2+JwSftGfIs13+7vE3diRidL2m5G241WpQnsieQvsagQH4mq/o5NWdtgAK9CvrsQvxaxW61Lc3AmJBNxP1yY7easK7A+jkCzcUTKDwy3O5PmxLkrVfeh2E7TbLdkXYMDMcs088TdzqWFIpsO6fOydd0pGFpQYfav8At4ryuFeaim/wAAAABJRU5ErkJggg==" alt="location">
      </div>
      <div class="navbar_options_input-wrapper">
        <input
            type="text"
            placeholder="Search location"
            v-model="weatherStore.searchQuery"
            @keyup.enter=""
            @input="weatherStore.handleInput"
        >
        <img
            v-if="!weatherStore.searchQuery"
            class="navbar_options_input-wrapper_search"
            src="https://img.icons8.com/sf-regular/20/626262/search.png"
            alt="search"
        >
        <img
            v-else
            class="navbar_options_input-wrapper_clear"
            src="https://img.icons8.com/ios/30/626262/multiply.png"
            alt="clear"
            @click="weatherStore.searchQuery = ''"
        >
      </div>
    </div>
    <div v-show="weatherStore.isSearchResults" class="results">
      <ul>
        <li
            v-for="result in weatherStore.searchResults"
            :key="result.id"
            @click="selectResult(result)"

        >
          {{ [result.name, result.region, result.country].join(', ') }}
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {useWeatherStore} from "@/store/weather";
import {onMounted} from "vue";
import {ICoordinates} from "@/types/response";

const weatherStore = useWeatherStore()
let resultsElement: HTMLElement | null

function selectResult(result: ICoordinates) {
  weatherStore.fetchWeather({lon: result.lat, lat: result.lon});
  weatherStore.defaultParameters.mapCenter = Object.values({lon: result.lat, lat: result.lon}).reverse();
  weatherStore.searchQuery = ''
  weatherStore.searchResults = []
}

function handleClickOutside(event: MouseEvent) {
  if (resultsElement && !resultsElement.contains(event.target as Node)) {
    weatherStore.isSearchResults = false
  }
}
onMounted(() => {
  resultsElement = document.querySelector('.results')
  document.addEventListener('click', handleClickOutside)
})
</script>

<style scoped lang="sass">
.navbar
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 30px
  background-color: rgb(122, 100, 162)
  padding: 20px 60px
  position: relative
  &_logo
    color: white
    font-weight: bold
    font-size: 20px
  &_options
    align-items: center
    display: flex
    gap: 10px
    &_current-location
      cursor: pointer
      font-size: 9pt
      padding: 5px 10px
      border-radius: 5px
      display: flex
      gap: 5px
      align-items: center
      color: white
      &:hover
        background-color: #b29fd8
      & img
        width: 15px
    &_input-wrapper
      display: flex
      justify-content: space-between
      align-items: center
      background-color: white
      border-radius: 5px
      width: 275px
      & input
        background-color: white
        padding: 5px 15px
        border-radius: 5px
        border: none
        outline: none
        height: 25px
        color: #626262
        font-family: 'Montserrat', sans-serif
        width: 100%
        &::placeholder
          color: #949494
      &_search
        padding: 2px 15px
        height: 20px
      &_clear
        cursor: pointer
        padding: 2px 15px
        height: 25px
.results
  position: absolute
  top: 36px
  right: 60px
  border-bottom-left-radius: 5px
  border-bottom-right-radius: 5px
  background-color: white
  margin-top: 5px
  padding: 5px 5px 10px
  width: 275px
  z-index: 10
  color: #626262
  box-shadow: 6px 10px 10px rgba(0,0,0,0.2)
  & ul
    display: flex
    flex-direction: column
    gap: 5px
    list-style: none
    font-size: 10pt
    & li
      cursor: pointer
      padding: 5px 10px
      border-radius: 5px
      &:hover
        background-color: #ffefc7
</style>
