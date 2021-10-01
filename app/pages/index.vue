<template>
  <div>    
    <div class="d-centered-flex">
      <Header />
    </div>
    <div class="d-centered-flex">
      <!-- CONSUME -->
      <LeftSection /> 
      <!-- ENRICH -->     
      <MiddleSection/>      
      <!-- DELIVER -->
      <RightSection />      
    </div>
  </div>
</template>
<script>
import DataSourceFeeder from '../components/DataSourceFeeder'

export default {  
  asyncData() {
    return {
      rendering: process.server ? 'server' : 'client'
    }
  },
  head: {
    script: [
        {  
            type: 'text/javascript', 
            src: 'https://download.pushtechnology.com/clients/6.5.1/js/diffusion-6.5.1.js',
            async: false
        }
    ]
  },  
  methods: {
        publishFlighsToDiffusion(flights) {
            console.log('Publishing flights to Diffusion')
            this.$diffusionService.publish(flights)
        },

        async startPollingFlights() {
            this.$localOpenSkyAPI.setCallback(this.publishFlighsToDiffusion)
            this.$localOpenSkyAPI.startPolling()
        },        

        setPolledMockData(flights) {
          this.$store.commit('flights/set', flights);
        },        
    },
  async mounted() {
    this.$diffusionService.setTopicsStore(this.$store.state.topics)
    this.$diffusionService.setFlightsStore(this.$store.state.flights)
    this.$diffusionService.setDiffusionStore(this.$store.state.diffusion)
    this.$diffusionService.setStore(this.$store)    

    /** Connect to DIFFUSION */    
    this.$diffusionService.connect(
        'integra.us.diffusion.cloud',
        'admin',
        'admin1234',
        this.$store.state.topics.rootTopic,
        /* on message from Diffusion */
        null,
        /* on connected to Diffusion */
        () => { 
          //this.startPollingFlights();               
          DataSourceFeeder.startPolling(3000, this.$store)
          this.$store.commit('diffusion/setConnected', true)
        }
    );      
  }
}
</script>