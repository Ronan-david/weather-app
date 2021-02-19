<template>
    <section class="weather-box">
        <!-- box de présentation de la météo à venir -->
        <h2>{{ cityName }}</h2>
        <h3>{{ description }}</h3>
        <img :src="icon" />
        <p>{{ temperature }}°</p>
        <p>Humidité: : {{ humidity }} %</p>
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
        temperature: {
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
        }
    }
}
</script>
<style lang="scss">

.weather-box {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
}
</style>
