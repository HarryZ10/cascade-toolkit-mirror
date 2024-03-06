<template>
  <div>
    <HeaderSection/>
    <PagePanel/>
    <FooterSection/>
  </div>
</template>

<script>
import FooterSection from './components/Footer.vue';
import PagePanel from './components/PagePanel.vue';
import HeaderSection from './components/Header.vue';

import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
    name: 'App',
    components: {
        PagePanel,
        FooterSection,
        HeaderSection,
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
}

a {
  text-decoration: none;
}

h4 {
  margin-top: 2.04rem;
}
</style>
