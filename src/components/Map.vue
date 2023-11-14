<template>
  <div class="map">
    <yandex-map
        class="ymaps3x0--map"
        v-model="map"
        :settings="{
          location: {
            center: weatherStore.mapCenter,
            zoom: 10,
          },
        }"
        border-radius="10px"
        @click="handleMapClick"
    >
      <yandex-map-default-scheme-layer/>
    </yandex-map>
  </div>
</template>

<script setup lang="ts">
import type { YMap } from '@yandex/ymaps3-types';
import { useWeatherStore } from '@/store/weather';
import {YandexMap, YandexMapDefaultSchemeLayer} from "vue-yandex-maps";
import {onMounted, ref, shallowRef} from "vue";

const weatherStore = useWeatherStore();
const map = shallowRef<YMap | null>(null);

function handleMapClick(event: any) {
}

weatherStore.getUserCoordinates()
</script>

<style scoped lang="sass">
.map
  width: 500px
  height: 300px
  border-radius: 10px
  background-color: rgba(122, 92, 176, 0.5)
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.2)
.ymaps3x0--map
  border-radius: 10px
@media (max-width: 480px)
  .map
    width: 350px
    height: 200px
    border-radius: 10px
    background-color: rgba(122, 92, 176, 0.5)
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.2)
  .ymaps3x0--map
    border-radius: 10px
@keyframes gradientAnimation
  0%
    background-position: 0 0
  50%
    background-position: 100% 0
  100%
    background-position: 0 0
</style>
