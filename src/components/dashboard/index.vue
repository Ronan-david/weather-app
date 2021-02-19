<template>
    <section class="dashboard">
        <!-- composant météo du jour -->
        <div class="dashboard__today-weather">
            <weather-box
                v-if="getIcon"
                :cityName="cityName"
                :description="description"
                :humidity="humidity"
                :temperature="temperature"
                :getIcon='getIcon'
            />
        </div>
        <!-- composant météo de la semaine : v-for de la réponse axios sur 7 jours-->
    </section>
</template>
<script>

import axios from 'axios'
import WeatherBox from '../weatherBox'

export default {
    name: 'DashBoard',
    components: {
        WeatherBox
    },
    data () {
        return {
            dailyUrl: 'https://api.openweathermap.org/data/2.5/weather?q=',
            oneCall: 'https://api.openweathermap.org/data/2.5/onecall?',
            appKey: '&appid=139356f9973cdaecfb9ffff4f0ee7d31',
            lang:'&lang=fr',
            cityName: '',
            description: '',
            humidity: null,
            temperature: null,
            getIcon: null
        }
    },
    methods: {
        getGeoLocalisation() {
            const success = (pos) => {
                let crd = pos.coords
                this.getWeather(crd)
            }
            const error = (err) => {
                console.warn(`error getGeoLocalisation (${err.code}): ${err.message}`);
            }
            navigator.geolocation.getCurrentPosition(success, error)
        },
        async getCityName(lat, lon) {
            const getCity = this.dailyUrl + lat + lon + '&units=metric' + this.lang + this.appKey
            try {
                const RESPONSE = await axios.get(getCity)
                this.cityName = RESPONSE.data.name
                this.description = RESPONSE.data.weather[0].description
                this.humidity = RESPONSE.data.main.humidity
                this.temperature = Math.floor(RESPONSE.data.main.temp)
                this.getIcon = RESPONSE.data.weather[0].icon
            } catch (error) {
                console.error('error getCityName: ', error)
            }
        },
        async getWeather(crd) {
            const LAT = '&lat=' + crd.latitude
            const LON = '&lon=' + crd.longitude
            this.getCityName(LAT, LON)
            const WEATHERURL = this.oneCall + LAT + LON + '&units=metric' +this.appKey + this.lang
            try {
                await axios.get(WEATHERURL)
            } catch (error) {
                console.error('error getWeather: ', error)
            }
        }
    },
    created () {
        this.getGeoLocalisation()
    }
}
</script>
<style lang="scss">
@import '@/assets/style/mixins';

.dashboard {
    &__today-weather {
        width: 100%;
        border-radius: pxToRem(5);
        border: 1px solid grey;
        margin: 0 auto;

        @include media-breakpoint-up(md) {
            width: 50%
        }

        @include media-breakpoint-up(lg) {
            width: 25%
        }
    }
}
</style>
