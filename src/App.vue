<template>
  <div id="app">
    <AccessApi></AccessApi>
  </div>
</template>

<script>
import AccessApi from './components/AccessApi.vue'

export default {
  name: 'App',
  components: {
    AccessApi
  }
}
</script>

<style>
html{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
    ul{
        list-style-type: none;
    }
    li{
        list-style-type: none;
    }
</style>
