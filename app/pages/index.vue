<template>
  <div>
    <div class="d-centered-flex">
      <Header />
    </div>
    <div class="d-centered-flex justify-between main-body">
      <!-- CONSUME -->
      <LeftSection />
      <!-- ENRICH -->
      <MiddleSection/>
      <!-- DELIVER -->
      <RightSection />
    </div>
  </div>
</template>
<style scoped>
.main-body {
  padding: 0 40px;
}
</style>
<script>
import DataSourceFeeder from '../components/DataSourceFeeder'
import Config from '../api/config/config'

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
            src: 'https://download.pushtechnology.com/clients/6.7.7/js/diffusion-6.7.7.js',
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
        }
    },
  async mounted() {
    /* Sets app Template's config. At first we set it to NBA Template */
    !this.$store.state.app.config ? Config.setAppConfig(this.$store, this.$NBAConfig) : null

    this.$diffusionService.setTopicsStore(this.$store.state.topics)
    this.$diffusionService.setDiffusionStore(this.$store.state.diffusion)
    this.$diffusionService.setStore(this.$store)
    this.$diffusionService.setConfig(this.$store.state.app.config)

    console.log('CONFIG:', this.$config)

    /** Connect to DIFFUSION */
    this.$diffusionService.connect(
        this.$config.diffusionServer,
        this.$config.diffusionUser,
        this.$config.diffusionPassword,
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
