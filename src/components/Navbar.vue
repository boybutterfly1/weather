<template>
  <nav class="navbar">
    <div class="navbar_logo">
      <span>Weather</span>
    </div>
    <div class="navbar_input-wrapper">
      <input
        type="text"
        placeholder="Search location"
        v-model="weatherStore.searchQuery"
        @keyup.enter="weatherStore.handleSearch()"
      >
      <img src="https://img.icons8.com/sf-regular/20/626262/search.png" alt="search">
    </div>
  </nav>
</template>

<script setup lang="ts">

import {useWeatherStore} from "@/store/weather";

const weatherStore = useWeatherStore()
</script>

<style scoped lang="sass">
.navbar
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 30px
  background-color: rgb(122, 100, 162)
  height: 30px
  padding: 20px
  &_logo
    color: white
    font-weight: bold
    font-size: 20px
  &_input-wrapper
    display: flex
    align-items: center
    background-color: white
    border-radius: 5px
    & input
      background-color: white
      border-radius: 5px
      padding: 2px 5px
      border: none
      outline: none
      height: 20px
      color: #626262
      &::placeholder
        color: #949494
    & img
      padding: 2px 5px
      height: 20px
</style>
