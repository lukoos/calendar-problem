<script setup>
import Calendar from './components/Calendar.vue';
import CalendarConfiguration from './components/CalendarConfiguration.vue'
import jsonConfiguration from "./assets/configuration.json"

import { ref } from 'vue'
let calendarConfiguration = ref('')

function handleConfigurationData(data) {
  calendarConfiguration.value = JSON.stringify(data)
}

</script>

<template>
  <h1>Calendar App</h1>
  <CalendarConfiguration @handleConfiguration="handleConfigurationData" :baseConf="jsonConfiguration"></CalendarConfiguration>
  <Calendar :conf="calendarConfiguration"></Calendar>
</template>