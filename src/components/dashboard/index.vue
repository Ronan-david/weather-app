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
            oneCall: 'https://api.openweathermap.org/data/2.5/onecall?',
            weekurl: 'https://pro.openweathermap.org/data/2.5/forecast/climate?q=',
            appKey: '&appid=139356f9973cdaecfb9ffff4f0ee7d31',
            lang:'&lang=fr'
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
        async getWeather(crd) {
            const LAT = crd.latitude
            const LON = crd.longitude
            const WEATHERURL = this.oneCall + '&lat=' + LAT + '&lon=' + LON + this.appKey + this.lang
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
