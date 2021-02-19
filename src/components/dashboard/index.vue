<template>
    <section class="dashboard">
        <!-- composant météo du jour -->
        <!-- composant météo de la semaine : v-for de la réponse axios sur 7 jours-->
    </section>
</template>
<script>

import axios from 'axios'

export default {
    name: 'DashBoard',
    data () {
        return {
            dailyUrl: 'https://api.openweathermap.org/data/2.5/weather?q=',
            oneCall: 'https://api.openweathermap.org/data/2.5/onecall?',
            appKey: '&appid=139356f9973cdaecfb9ffff4f0ee7d31',
            lang:'&lang=fr',
            cityName: ''
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
            const getCity = this.dailyUrl + lat + lon + this.appKey + this.lang
            try {
                const RESPONSE = await axios.get(getCity)
                this.cityName = RESPONSE.data.name
            } catch (error) {
                console.error('error getCityName: ', error)
            }
        },
        async getWeather(crd) {
            const LAT = '&lat=' + crd.latitude
            const LON = '&lon=' + crd.longitude
            this.getCityName(LAT, LON)
            const WEATHERURL = this.oneCall + LAT + LON + this.appKey + this.lang
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
<style lang="sass">

</style>
