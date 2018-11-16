<template>
  <div id="app">
    <domain
      v-for="d in domains"
      v-bind:domain="d">
    </domain>
  </div>
</template>

<script>
import Domain from './components/Domain.vue' 
import DomainsApi from './services/api/Domain.js'


export default {

  name: 'app',
  components: {
    Domain
  },
  created() {
    DomainsApi.getDomains().then(domains => {
      this.domains = domains
    }) 
  },
  data() {
    return {
      domains:[]
    } 
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
