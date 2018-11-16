<template>
  <div class="domain">
    <h2> {{ domain.name }} </h2>
    <ticket
      v-for="t in domain.tickets"
      v-bind:ticket="t">
    </ticket>
  </div> 
</template>

<script>
import Ticket from './Ticket.vue'

export default {
  name:'Domain',
  components: {
    Ticket
  },
  props: {
    domain: Object
  }
}
</script>

<style>
  .domain > h2 {
    text-align:center;
    text-decoration:underline;
  }

  .domain {
    width:50%;
    text-align:left;
    margin: 0 .5em;
    padding: 0 1em;
  }
</style>


