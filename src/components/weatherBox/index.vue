<template>
    <section
        class="weather-box"
        :class="{'weather-box__today': today}"
    >
        <h4
            v-if="date"
            class="weather-box__date"
        >
            {{ date }}
        </h4>
        <img
            class="weather-box__icon"
            :src="icon"
        />
        <h3
            class="weather-box__description"
        >
            {{ description }}
        </h3>
        <p
            class="weather-box__temperature"
            :class="{'weather-box__temperature--big': today}"
        >
            {{ temperature }}°C
        </p>
        <p
            v-if="humidity"
        >
            Humidité: : {{ humidity }} %
        </p>
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
        today: {
            type: Boolean,
            default: () => (false),
            required: false
        },
        date: {
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
@import '@/assets/style/variables';

.weather-box {
    &__today {
        flex-flow: column nowrap;
        padding: pxToRem(10);

        .weather-box__icon {
            height: 40%;
            width: 50%;
            margin: 0 auto;

            @include media-breakpoint-up(sm) {
                height: auto;
                width: auto;
            }
        }
    }

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    z-index: 1;
    margin: pxToRem(5);

    @include media-breakpoint-up(sm) {
        flex-flow: column nowrap;
        justify-content: center;
        margin: 0 pxToRem(5);
        margin-top: pxToRem(15);
        padding: pxToRem(10);
        border-radius: pxToRem(5);
    }

    @include media-breakpoint-up(md) {
        margin-top: 0;
    }

    // glassmorphism
    background: $glass-bg-color;
    box-shadow: $glass-box-shadow;
    backdrop-filter: $glass-backdrop-filter;
    -webkit-backdrop-filter: $glass-backdrop-filter;
    border-radius: $glass-border-radius;
    border: $glass-border;

    &__description {
        font-size: $font-size-12;
        margin: 0;
    }

    &__temperature {
        font-size: $font-size-16;
        margin: pxToRem(10) 0 0 0;

        &--big{
        font-size: $font-size-50;

        }
    }

    &__date {
        margin: 0;
    }

    &__icon {
        width: 25%;

        @include media-breakpoint-up(sm) {
            width: auto;
        }

    }
}
</style>
