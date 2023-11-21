<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<script setup lang="ts">
</script>
<style lang="sass">
*
  margin: 0
  padding: 0
  box-sizing: border-box
  overscroll-behavior: none
.app
  font-family: 'Montserrat', sans-serif
  background: linear-gradient(to bottom, #f7e8ff, #cbd8ff)
  height: 100vh
  overflow: auto
</style>
