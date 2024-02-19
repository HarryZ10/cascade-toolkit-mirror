<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <PagePanel/>
  </div>
</template>

<script>
import PagePanel from './components/PagePanel.vue';

export default {
    name: 'App',
    components: {
        PagePanel,
    },
};
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
