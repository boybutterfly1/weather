<template>
  <div class="forecast">
    <div
        v-for="day in weekDays"
        class="forecast_day"
    >
    </div>
  </div>
</template>

<script setup lang="ts">
const weekDays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
    width: 70px
    height: 110px
    display: flex
    flex-direction: column
    align-items: start
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
