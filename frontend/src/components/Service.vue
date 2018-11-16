<template>
  <div class="service" v-bind:class="getClass()">
    <ul> 
      <li>Service: {{ service.name }}</li>
      <li>Branch: {{ service.branch }}</li>
      <li>Deployed at: {{ service.deployment_date }}</li>
      <li>Deployed by: {{ service.deployed_by }}</li>
    </ul>	
  </div> 
</template>

<script>
  export default {
    name:'Service',
    methods: {
      getClass: function () {
        var status = 'in-progress';
        if (this.status === 'Resolved' || this.status === 'Closed') {
          status = 'resolved';
        } else if (this.status === 'Reopened') {
          status = 'rejected';
        }
        return status;
      }
    },
    props: {
      service: Object,
      status: String
    }
  }
</script>

<style>
  .service {
    margin: .5em 0;
    border-radius: 1em;
    padding:.5em
  }

  .service ul {
    padding-inline-start:20px;
    list-style: none;
  }

  .in-progress {
    background: #00e1ff45;
  }

  .resolved {
    background: #63f9638f;
  }

  .rejected {
    background: #ff59597d;
  }
</style>

