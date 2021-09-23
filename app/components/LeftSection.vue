<template>
    <div class="col main-col">
        <SectionHeader title="Consume"  subTitle="">
          Consumer real-time events from <a href='#' v-tooltip.bottom-center="`opensky-network.org/api/states/all`">Source</a> using REST API
        </SectionHeader>
        <div class="d-end-flex consume-flow">
          <div class="left-column consume-title">
            <div class="plane" />
            <p class="flow-title">Flight Tracking</p>
            <p class="flow-subtitle">JSON Stream</p>
          </div>
          <div class="right-column">
            <img src="~/assets/images/consume-flow.svg"/>
          </div>
        </div>
        <IncomingData :value="incomingDataSourceData" elClass="incoming-red" />
        <FlightPoller></FlightPoller>
      </div>      
</template>

<script>
export default ({
    computed: {
        incomingDataSourceData() {
        return this.$store.state.flights.incomingDataSourceData.toLocaleString('en')  
        },
    }
})
</script>
