<template>
    <div class="col main-col">
        <SectionHeader title="Consume"  subTitle="">
          <p>Easily publish realtime events from any <a href='#' v-tooltip.bottom-center="`${toolTip}`">Source</a> using our Adapters and SDK.</p>
          <p>Hook any data feed into Diffusion and monitor its health in realtime.</p>
        </SectionHeader>
        <div class="d-end-flex consume-flow" :style="{'margin-top':'10px'}">
          <div class="left-column consume-title">
            <div :class="sectionIconClass" />
            <p class="flow-title">{{title}}</p>
            <p class="flow-subtitle">JSON Stream</p>
          </div>
          <div class="right-column">
            <img src="~/assets/images/consume-flow.svg"/>
          </div>
        </div>
        <IncomingDataFull :value="incomingDataSourceData" elClass="incoming-red" />
        <DataPoller />
      </div>      
</template>

<script>
export default ({
    computed: {
        incomingDataSourceData() {          
          return this.$store.state.app.config ? this.$store.state.app.config.getIncommingData(this.$store).toLocaleString('en') : '0'
        },
        title() {
          return this.$store.state.app.config ? this.$store.state.app.config.getConsumeAssets().text : ''
        },
        sectionIconClass() {
          return this.$store.state.app.config ? this.$store.state.app.config.getConsumeAssets().iconClass : ''
        },
        toolTip() {
          return this.$store.state.app.config ? this.$store.state.app.config.getConsumeAssets().toolTip : ''
        }
    }
})
</script>
