<template>
    <div class="col main-col right">
        <SectionHeader title="Deliver" subTitle="">
          Deliver the precise event-data required by the <a href="https://www.pushtechnology.com/developers/cloud/latest/#sdk" target="_blank">client Application</a>
        </SectionHeader>
        <div class="d-start-flex deliver-flow">
          <div class="left-column consume-title">
            <img src="~/assets/images/deliver-flow.svg"/>            
          </div>
          <div class="right-column">
            <div :class="sectionIconClass" />
            <p class="flow-title">{{title}}</p>
            <p class="flow-subtitle">Web client</p>
          </div>
        </div>        
        <IncomingData :value="incomingDiffusionDataAll" elClass="incoming-green" v-if="showAll && diffusionEnabled" />
        <IncomingData :value="incomingDiffusionDataFiltered" elClass="incoming-green" v-if="!showAll && diffusionEnabled" />
        <IncomingData :value="incommingDiffusionDataNoSavings" :showLegend="true" elClass="incoming-red" v-if="!diffusionEnabled" />
        
        <div :class="templateHolderClass">
          <TemplatesNbaEvents v-if="currentComponent === 'TemplatesNbaEvents'" />
          <TemplatesFlightsTracker v-if="currentComponent === 'TemplatesFlightsTracker'" />
        </div>
        
      </div>
</template>

<script>
export default ({
    data() {
        return {}    
    },
    methods: {
        
    },
    computed: {
      currentComponent() {
        return this.$store.state.app.template
      },
      diffusionEnabled() {
        return this.$store.state.diffusion.diffusionEnabled
      },
      templateHolderClass() {
        return this.$store.state.diffusion.diffusionEnabled ? 'holder-show' : 'holder-hide'
      },
      incomingDiffusionDataAll() {
        return Math.round(this.$store.state.app.config ? this.$store.state.app.config.getIncommingDataAll(this.$store) : 0).toLocaleString('en')  
      },
      incomingDiffusionDataFiltered() {
        return Math.round(this.$store.state.app.config ? this.$store.state.app.config.getIncommingDataFiltered(this.$store) : 0).toLocaleString('en')
      },    
      incommingDiffusionDataNoSavings() {
        return this.$store.state.app.config ? this.$store.state.app.config.getIncommingData(this.$store).toLocaleString('en') : '0'
      },
      showAll() {
        return this.$store.state.app.config ? this.$store.state.app.config.getShowAll(this.$store) : false        
      },
      title() {
        return this.$store.state.app.config ? this.$store.state.app.config.getDeliverAssets().text : ''
      },
      sectionIconClass() {
        return this.$store.state.app.config ? this.$store.state.app.config.getDeliverAssets().iconClass : ''
      }
    }
})
</script>
<style scoped>
.holder-show, .holder-hide {
  display: flex;
}

.holder-hide {
  display: none;
}
</style>
