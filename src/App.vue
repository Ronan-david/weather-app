<template>
  <div id="app">
    <dash-board />
  </div>
</template>

<script>
import DashBoard from './components/dashboard'

export default {
  name: 'App',
  components: {
    DashBoard
  }
}
</script>

<style lang="scss">
@import '@/assets/style/mixins';
@import '@/assets/style/variables';

body{
  margin:0;
  padding:0;
  height: 100%;

  @include media-breakpoint-up(md) {
    height: 100vh;
  }
}
#app {
  height: 100%;
  font-family: $univers-font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $univers-color;
  padding-top: pxToRem(60);
  background: #1488cc;

  &::before, &::after {
    @include media-breakpoint-up(md) {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  &::before {
    @include media-breakpoint-up(md) {
      background: linear-gradient(#f00, #f0F);
      clip-path: circle(30% at 88% 77%);
    }
  }
  &::after {
    @include media-breakpoint-up(md) {
      background: linear-gradient(#2196f3, #e91e63);
      clip-path: circle(20% at 15% 15%);
    }
  }
}
</style>
