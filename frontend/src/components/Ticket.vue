<template>
  <div class="ticket">
    <h2><a target="_new" v-bind:href="getTicketLink()">{{ ticket.name }}</a> </h2>
    <service
      v-for="s in ticket.services"
      v-bind:service="s"
      v-bind:status="ticket.status"
      v-bind:key="s.name">
    </service>
  </div>  
</template>

<script>
  import Service from './Service.vue'

  export default {
    name: 'Ticket',
    props: {
      ticket: Object
    },
    components: {
      Service
    },
    methods: {
      getTicketLink: function() {
        return "https://tools.crowdtwist.com/issues/browse/" + this.ticket.name;
      }
    }
  }
</script>

<style>
  .ticket {
    text-align: left;
    padding: 1em;
    margin: .5em 0;
  }
</style>
