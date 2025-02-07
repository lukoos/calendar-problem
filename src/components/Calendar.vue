<template>
    <div class="calendar">
        <h2>Calendar Component</h2>
        <form id="calendar-form" @submit.prevent="submitData" class="calendar-form">
            <select id="calendar-select" v-model="selectedUnit" @change="handleUnitChange">
                <template v-for="unit in configuration" :key="unit.name">
                    <option v-if="unit.enabled" :value="unit.name">{{ unit.name }}</option>
                </template>
            </select>
            <input id="calendar-date-from" v-if="dateFrom && (selectedUnit === 'date-from' || selectedUnit === 'date-from-to')" type="date"
                v-model="dateFrom.value" :min="dateFrom.min" :max="dateFrom.max" />
            <input id="calendar-date-to" v-if="dateTo && (selectedUnit === 'date-to' || selectedUnit === 'date-from-to')" type="date"
                v-model="dateTo.value" :min="dateTo.min" :max="dateTo.max" />
            <input :id="`calendar-number-${numberUnit.name}`" v-if="showInput && numberUnit" type="number" :min="numberUnit.min" :max="numberUnit.max"
                v-model="numberUnit.value" placeholder="Enter value" />
            <button type="submit">Submit</button>
        </form>
        <pre id="output" class="calendar-output">{{ output }}</pre>
    </div>
</template>


<script setup>
import { ref, computed, onMounted, watch, defineEmits, defineProps } from 'vue'

const props = defineProps({
    conf: String
})

const { conf } = props
const emit = defineEmits(['handleData'])
const selectedUnit = ref('')
const dateFrom = ref(null)
const dateTo = ref(null)
const numberUnit = ref(null)
const configuration = ref([])
const output = ref(null)

const showInput = computed(() => {
    return !selectedUnit.value.includes('date-')
})

function handleUnitChange() {
    if (selectedUnit.value === 'date-from') {
        dateFrom.value = configuration.value.find((item) => item.name === 'date-from')
        dateTo.value = null
        numberUnit.value = null
    }
    else if (selectedUnit.value === 'date-to') {
        dateTo.value = configuration.value.find((item) => item.name === 'date-to')
        dateFrom.value = null
        numberUnit.value = null
    }
    else if (selectedUnit.value === 'date-from-to') {
        dateFrom.value = configuration.value.find((item) => item.name === 'date-from')
        dateTo.value = configuration.value.find((item) => item.name === 'date-to')
        numberUnit.value = null
    }
    else {
        numberUnit.value = configuration.value.find((item) => item.name === selectedUnit.value)
        dateFrom.value = null
        dateTo.value = null
    }
}

function submitData() {
    output.value = {
        configuration: configuration.value,
        selectedUnit: selectedUnit.value,
        numberUnit: null,
        dateUnitFrom: null,
        dateUnitTo: null,
    };

    if (dateFrom.value) {
        output.value.dateUnitFrom = {
            min: dateFrom.value.min,
            max: dateFrom.value.max,
            value: dateFrom.value.value
        }
    }
    if (dateTo.value) {
        output.value.dateUnitTo = {
            min: dateTo.value.min,
            max: dateTo.value.max,
            value: dateTo.value.value
        }
    }
    if (numberUnit.value) {
        output.value.numberUnit = {
            min: numberUnit.value.min,
            max: numberUnit.value.max,
            value: numberUnit.value.value
        }
    }
    emit('handleData', output.value)
}

watch(() => props.conf, () => {
    configuration.value = JSON.parse(props.conf)
    handleUnitChange()
});

onMounted(() => {
    if (conf) {
        configuration.value = JSON.parse(conf)
    }
})
</script>

<style scoped>
.calendar {
    background-color: lightgray;
    padding: 2rem;
}

.calendar-form {
    display: flex;
    width: 100%;
}

.calendar-form>* {
    flex: 1;
    margin: 1rem;
}

.calendar-output {
    font-size: 12px;
    line-height: 14px;
    background-color: #f0f0f0;
    padding: 1rem;
}
</style>