<template>
    <section class="weather-box">
        <h2 v-if="cityName">{{ cityName }}</h2>
        <h3>{{ description }}</h3>
        <img :src="icon" />
        <p>{{ temperature }}°</p>
        <p v-if="humidity">Humidité: : {{ humidity }} %</p>
    </section>
</template>
<script>
export default {
    name: 'weatherBox',
    data () {
        return {
        }
    },
    props: {
        cityName: {
            type: String,
            default: () => (''),
            required: false
        },
        description: {
            type: String,
            default: () => (''),
            required: false
        },
        humidity: {
            type: Number,
            default: () => 0,
            required: false
        },
        getTemp: {
            type: Number,
            default: () => 0,
            required: false
        },
        getIcon: {
            type: String,
            default: () => (''),
            required: false
        }
    },
    computed: {
        icon () {
            return `http://openweathermap.org/img/wn/${this.getIcon}@2x.png`
        },
        temperature () {
            return Math.floor(this.getTemp)
        }
    }
}
</script>
<style lang="scss">
@import '@/assets/style/mixins';

.weather-box {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    margin: 0 pxToRem(5);
    padding: pxToRem(10);
    border-radius: pxToRem(5);
    border: 1px solid grey;
}
</style>
