<template>
  <router-view></router-view>
  <Toast />
</template>

<script>
  import Toast from 'primevue/toast';
export default {
  name: 'App',
  components: {
    Toast
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
