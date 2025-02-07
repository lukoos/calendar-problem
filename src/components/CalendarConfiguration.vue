<template>
    <div class="calendar-configuration">
        <h2>Calendar Configuration Component</h2>
        <form class="calendar-configuration_form" @submit.prevent="submitConfigurationData">
            <fieldset class="calendar-configuration_fieldset" v-for="item in baseConfiguration" :key="item.name">
                <legend>{{ item.name }}</legend>
                <div>
                    <input type="checkbox" :id="item.name" name="enabled" v-model="item.enabled" />
                    <label for="enabled"> Enabled</label>
                </div>
                <template v-if="item.name === 'date-from'">
                    <label :for="`${item.name}-min`">min date:</label>
                    <input type="date" :name="`${item.name}-min`" v-model="item.min" />
                    <label :for="`${item.name}-max`">max date:</label>
                    <input type="date" :name="`${item.name}-max`" v-model="item.max" />
                </template>
                <template v-else-if="item.name === 'date-to'">
                    <label :for="`${item.name}-min`">min date:</label>
                    <input type="date" :name="`${item.name}-min`" v-model="item.min" />
                    <label :for="`${item.name}-max`">max date:</label>
                    <input type="date" :name="`${item.name}-max`" v-model="item.max" />
                </template>
                <template v-else-if="item.name !== 'date-from-to'">
                    <label for="min">min:</label>
                    <input type="Number" name="min" v-model="item.min" />
                    <label for="max">max:</label>
                    <input type="Number" name="max" v-model="item.max" />
                </template>
            </fieldset>
            <footer class="calendar-configuration_footer">
                <button type="submit">Save calendar setup</button>
            </footer>
        </form>
    </div>
</template>

<script setup>

import { ref, onMounted, defineEmits, defineProps } from 'vue'

const props = defineProps({
    baseConf: Array
})

const { baseConf } = props
const emit = defineEmits(['handleConfiguration'])
const baseConfiguration = ref([])

onMounted(() => {
    baseConfiguration.value = [...baseConf]
})

function submitConfigurationData() {
    emit('handleConfiguration', baseConfiguration.value)
}
</script>

<style scoped>
.calendar-configuration {
    background-color: lightblue;
    padding: 2rem;
    margin-bottom: 2rem;
}

.calendar-configuration_form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100%
}

.calendar-configuration_fieldset {
    flex: 1;
}

.calendar-configuration_footer {
    width: 100%;
    text-align: center;
    padding: 1rem;
}

.calendar-configuration_output {
    font-size: 12px;
    line-height: 14px;
    background-color: white;
    padding: 1rem;
}
</style>