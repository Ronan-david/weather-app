<template>
    <section class="dashboard">
        <h1 class="dashboard__city">{{ cityName }}</h1>
        <div class="dashboard__today-weather">
            <weather-box
                v-if="getIcon"
                :today="true"
                :description="description"
                :humidity="humidity"
                :getTemp="temperature"
                :getIcon='getIcon'
            />
        </div>
        <div
            v-if="weeklyWeather"
            class="dashboard__weekly-weather"
        >
            <weather-box
                v-for="(day, index) in weeklyWeather"
                :date="arrDate[index]"
                :key="index"
                :description="day.weather[0].description"
                :getTemp="day.temp.day"
                :getIcon="day.weather[0].icon"
            />
        </div>
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
            getIcon: null,
            weeklyWeather: null,
            arrDate: []
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
            const WEATHERURL = this.oneCall + LAT + LON + '&exclude=minutely' + '&units=metric' + this.appKey + this.lang
            try {
                const RESPONSE = await axios.get(WEATHERURL)
                this.weeklyWeather = RESPONSE.data.daily
                this.weeklyWeather.pop()
            } catch (error) {
                console.error('error getWeather: ', error)
            }
        },
        getDates() {
            let options = {weekday: "long"};
            for (let i = 1; i <= 7; i++) {
                let newDate = new Date(Date.now() + i*24*60*60*1000);
                this.arrDate.push(new Intl.DateTimeFormat('fr-FR', options).format(newDate))
            }
        }
    },
    created () {
        this.getGeoLocalisation()
        this.getDates()
    }
}
</script>
<style lang="scss">
@import '@/assets/style/mixins';
@import '@/assets/style/variables';

.dashboard {
    padding-top: pxToRem(30);
    &__city {
        font-weight: 700;
        text-align: center;
        padding: pxToRem(5) pxToRem(8);
        font-size: $font-size-24;
        border-radius: pxToRem(15);
        border-top: pxToRem(1) solid $border-color;
        backdrop-filter: blur(5px);
        border-left: pxToRem(1) solid $border-color;
        background: $darker-grey;
        width: 50%;
        margin: 0 auto;
        margin-bottom: pxToRem(15);

        @include media-breakpoint-up(sm) {
            width: 25%
        }
    }
    &__today-weather {
        width: 75%;
        margin: 0 auto;
        margin-bottom: pxToRem(15);

        @include media-breakpoint-up(sm) {
            width: 25%
        }

        @include media-breakpoint-up(lg) {
            width: 15%
        }
    }

    &__weekly-weather {
        display: flex;
        flex-flow: column nowrap;

        @include media-breakpoint-up(sm) {
            width: 100%;
            flex-flow: row wrap;
            justify-content: center;
        }
        @include media-breakpoint-up(md) {
            width: 100%;
            flex-flow: row nowrap;
            justify-content: center;
        }
    }
}
</style>
