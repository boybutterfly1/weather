<template>
  <div class="current-weather">
    <div class="current-weather_location"/>
    <div class="current-weather_current"/>
    <div class="current-weather_other"/>
  </div>
</template>

<style scoped lang="sass">
.current-weather
  display: flex
  flex-direction: column
  align-items: center
  width: 500px
  height: 300px
  padding: 20px 50px 30px
  border-radius: 10px
  gap: 20px
  background-color: rgba(122, 92, 176, 0.5)
  box-shadow: 5px 10px 10px rgba(0,0,0,0.2)
  &_location
    width: 185px
    height: 85px
    border-radius: 15px
    opacity: 0.5
    background: linear-gradient(90deg, #e4d3ff, #ffffff, #e4d3ff)
    background-size: 200% 200%
    animation: gradientAnimation 2.5s linear infinite alternate
  &_current
    width: 320px
    height: 85px
    border-radius: 15px
    opacity: 0.5
    background: linear-gradient(90deg, #e4d3ff, #ffffff, #e4d3ff)
    background-size: 200% 200%
    animation: gradientAnimation 2.5s linear infinite alternate
  &_other
    width: 375px
    height: 25px
    border-radius: 15px
    opacity: 0.5
    background: linear-gradient(90deg, #e4d3ff, #ffffff, #e4d3ff)
    background-size: 200% 200%
    animation: gradientAnimation 2.5s linear infinite alternate

@keyframes gradientAnimation
  0%
    background-position: 0 0
  50%
    background-position: 100% 0
  100%
    background-position: 0 0
</style>
<script setup lang="ts">
</script>