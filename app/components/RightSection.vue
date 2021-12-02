<template>
    <div class="col main-col right">
        <SectionHeader title="Deliver" subTitle="">
          <p>Millions of client applications can subscribe in realtime to any event message using our Adapters and SDK.</p>
          <p>Diffusion automatic topic tree, makes fine-grained subscription very simple</p>
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

        <IncomingDataFull :value="incomingDiffusionDataAll" elClass="incoming-green" v-if="showAll && diffusionEnabled" />
        <IncomingDataFull :value="incomingDiffusionDataFiltered" elClass="incoming-green" v-if="!showAll && diffusionEnabled" />                
        
        <div :class="templateHolderClass">
          <TemplatesNbaEvents v-if="currentComponent === 'TemplatesNbaEvents'" />
          <TemplatesFlightsRightColumn v-if="currentComponent === 'TemplatesFlightsTracker'" />
        </div>
        
      </div>
</template>

<script>
export default ({
    data() {
        return { initialValue: 0 }
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
      },
      incomingDiffusionDataAll() {
          return Math.round(this.$store.state.app.config ? this.$store.state.app.config.getIncommingDataAll(this.$store) : 0).toLocaleString('en')  
      },
      incomingDiffusionDataFiltered() {
          return Math.round(this.$store.state.app.config ? this.$store.state.app.config.getIncommingDataFiltered(this.$store) : 0).toLocaleString('en')
      }
    }
})
</script>
<style scoped>
.holder-show, .holder-hide {
  display: flex;
  width: 100%;
}

.holder-hide {
  display: none;
}
</style>
