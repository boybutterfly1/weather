<template>
  <div class="map">
    <yandex-map
        v-model="map"
        :settings="{
          location: {
            center: center,
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
const center = ref<number[] | null>([37.617644, 55.755819])

function handleMapClick() {
  console.log(map.value)
}
onMounted(async () => {
  await weatherStore.getUserLocation()
  map.value?.setLocation({
    center: weatherStore.userLocation,
    zoom: 5
  })
  center.value = weatherStore.searchedCoordinates ? weatherStore.searchedCoordinates : weatherStore.userLocation
})
</script>

<style scoped lang="sass">
.map
  width: 500px
  height: 300px
  border-radius: 10px
  background-color: rgba(122, 92, 176, 0.5)
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.2)
</style>
