<template>
  <div>    
    <div class="d-centered-flex">
      <div class="col main-col w-100 no-border">
          <div class="diffusion-logo">
            <img src="~/assets/images/diffusion-logo.png" height="38px"/>
            &nbsp;<h1>Playground</h1>
          </div>          
          <p>A sample web application to <b>consume</b>, <b>enrich</b> and <b>deliver</b> real-time events using Diffusion </p>
      </div>
    </div>
    <div class="d-centered-flex">
      <div class="col main-col">
        <SectionHeader title="Consume"  subTitle="">
          Consumer real-time events from <a href='https://www.pushtechnology.com/developers'>Source</a> using REST API
        </SectionHeader>>        
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
      <div class="main-col middle no-border" style="width: 20%">
        <SectionHeader title="Enrich" subTitle="">
          Transform the event-data using DSL (a declarative language) in Diffusion.
        </SectionHeader>>
        
        <CloudOnPremiseToggle />
        
        <img class="flow-arrow-right" src="~/assets/images/arrow-right.svg">
        <p class="flow-arrow-right-text">All real-time data wrangling is done by Diffusion on-the-fly, so that you only publish what’s needed and not all your event data stream </p>
      </div>
      <div class="col main-col right">
        <SectionHeader title="Deliver" subTitle="">
          Deliver the precise event-data required by the <a href="https://www.pushtechnology.com/search/diffusion-docs?q=JavaScript%20Client%20Application">client Application</a>
        </SectionHeader>>
        <div class="d-start-flex deliver-flow">
          <div class="left-column consume-title">
            <img src="~/assets/images/deliver-flow.svg"/>            
          </div>
          <div class="right-column">
            <div class="mobile-friendly" />
            <p class="flow-title">Flight Tracker</p>
            <p class="flow-subtitle">Web client</p>
          </div>
        </div>        
        <IncomingData :value="incomingDiffusionDataAll" elClass="incoming-green" v-if="showAll" />
        <IncomingData :value="incomingDiffusionDataByAirline" elClass="incoming-green" v-else />
        <client-only>
          <FlightTracker 
              v-bind:options="byAirline" 
              v-bind:selected="byAirline[1].value"
              :selectionName="byAirline"
              :filterFn="filterAirlines"
            >
          </FlightTracker>
          <hr>
          <FlightTracker 
            v-bind:options="byAltitude" 
            v-bind:selected="byAltitude[1].value"
            :selectionName="byAltitude"
            :filterFn="filterAltitude"
          >
          </FlightTracker>
          <hr>
          <FlightTracker  
            v-bind:options="bySpeed" 
            v-bind:selected="bySpeed[1].value"
            :selectionName="bySpeed"
            :filterFn="filterSpeed"
          >
          </FlightTracker>
        </client-only>
      </div>
    </div>
  </div>
</template>
<script>
import DataSourceFeeder from '../components/DataSourceFeeder'

export default {  
  computed: {
    incomingDataSourceData() {
      return this.$store.state.flights.incomingDataSourceData.toLocaleString('en')  
    },
    incomingDiffusionDataAll() {
      return Math.round(this.$store.state.flights.incomingDiffusionDataAll).toLocaleString('en')  
    },
    incomingDiffusionDataByAirline() {
      return Math.round(this.$store.state.flights.incomingDiffusionDataByAirline).toLocaleString('en')
    },
    showAll() {
      return this.$store.state.flights.showAll
    },
    dataSavingsPercentage() {
      if (this.$store.state.flights.showAll) {
        return 100 - this.$store.state.flights.allAirlinesDataSavingPercentage
      }
      return 100 - this.$store.state.flights.byAirlineDataSavingPercentage
    }
  },
  data() {
    return {
      byAirline: [{
        value: '--ALL--',
        text: 'All Airlines'
      },{
        value: 'AAL',
        text: 'American Airlines'
      },
      {
        value: 'AMX',
        text: 'Aeromexico'
      }, 
      {
        value: 'DAL',
        text: 'Delta Airlines',        
      },
      {
        value: 'FDX',
        text: 'Federal Express',        
      },
      {
        value: 'SWA',
        text: 'SouthWest Airlines',        
      }, 
      {
        value: 'UAL',
        text: 'United Airlines',        
      }],
      byAltitude: [{
        value: '--ALL--',
        text: 'All Altitudes'
      },{
        value: 1,
        text: '< 5000'
      },
      {
        value: 2,
        text: '>= 5000 and < 10000'
      },
      {
        value: 3,
        text: '>= 10000'
      }],
      bySpeed: [{
        value: '--ALL--',
        text: 'All Speeds'
      },{
        value: 1,
        text: '< 200'
      },
      {
        value: 2,
        text: '>= 200 and < 500'
      },
      {
        value: 3,
        text: '>= 500'
      }]
    }
  },
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

        /** Filter Airlines */
        filterAirlines(flight, selectedFilter) {          
          return flight[1].substr(0,3) === selectedFilter && this.latLongIsValid(flight)
        },

        /** Filter by Altitude */
        filterAltitude(flight, selectedFilter) {          
          if (selectedFilter == 1) {                        
            return flight[7] < 5000  && this.latLongIsValid(flight);
          }

          if (selectedFilter == 2 ) {            
            return flight[7] >= 5000 && flight[7] < 10000 && this.latLongIsValid(flight);
          }          
          return flight[7] >= 10000 && this.latLongIsValid(flight);          
        },

        /** Filter by Speed */
        filterSpeed(flight, selectedFilter) {          
          /* Converting from m/s to mph */
          const mph = flight[9]? parseFloat(flight[9]) * 2.236936 : 0

          if (selectedFilter == 1) {
            return mph < 200 && this.latLongIsValid(flight);
          }

          if (selectedFilter == 2 ) {            
            return mph >= 200 && mph < 500 && this.latLongIsValid(flight);
          }

          return mph >= 500 && this.latLongIsValid(flight);          
        },

        latLongIsValid(flight) {
          const isValid = flight[6] !== null && flight[5] !== null          
          return isValid
        }
    },
  async mounted() {

    //await this.$localOpenSkyAPI.loadFirstDataSet();

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
          /*let mockFlights = {"time":1629819760,"states":[["abb40e","WSN26   ","United States",1629819759,1629819759,-122.1527,37.4409,601.98,false,69.94,312.02,-4.23,null,579.12,null,false,0],["abb2fe","FDX5328 ","United States",1629819758,1629819758,-122.2167,37.7189,null,true,0,340.31,null,null,null,null,false,0],["a057c7","DAL1311 ","United States",1629819759,1629819759,-122.1311,37.49,1341.12,false,107.05,346.1,-10.08,null,1348.74,"3126",false,0],["abf09e","DAL735  ","United States",1629819759,1629819759,-122.3272,37.6565,609.6,false,101.74,55.51,7.15,null,586.74,null,false,0],["c07b05","ACA760  ","Canada",1629819760,1629819760,-122.1233,37.765,2240.28,false,147.97,56.92,11.7,null,2278.38,"3277",false,0],["a6acba","N5290E  ","United States",1629819760,1629819760,-121.8167,37.3507,274.32,false,36.06,317.89,-0.98,null,274.32,null,false,0],["aa18e3","N75NG   ","United States",1629819755,1629819757,-122.1164,37.6585,null,true,0,157.5,null,null,null,null,false,0],["ab62d3","SWA4356 ","United States",1629819760,1629819760,-121.9606,37.4464,1120.14,false,128.32,50.69,15.61,null,1112.52,null,false,0],["ad2160","SKW5287 ","United States",1629819448,1629819449,-122.3893,37.6215,null,true,0.19,171.56,null,null,null,"3140",false,0],["a57ee6","SKW5905 ","United States",1629819760,1629819760,-122.4921,37.3957,4335.78,false,155.87,189.31,11.05,null,4495.8,"3652",false,0],["a81bcc","SKW5914 ","United States",1629819759,1629819760,-122.3851,37.6278,3352.8,false,131.08,139.94,0,null,3459.48,"3140",false,0],["a02dda","SKW5370 ","United States",1629819549,1629819549,-122.3857,37.6207,null,true,3.86,30.94,null,null,null,null,false,0],["abf396","SWA2930 ","United States",1629819756,1629819756,-122.2154,37.712,null,true,0,126.56,null,null,null,null,false,0],["a7a1b1","LXJ591  ","United States",1629819518,1629819533,-122.3828,37.6278,null,true,0.06,298.12,null,null,null,"4567",false,0],["a6ca52","BYF5    ","United States",1629819759,1629819759,-122.2289,37.5052,213.36,false,41.83,135.5,-2.28,null,167.64,null,false,0],["a83787","UAL605  ","United States",1629819759,1629819759,-122.3661,37.6288,68.58,false,94.81,27.82,16.58,null,38.1,null,false,0],["ab8b8c","NFX841  ","United States",1629819760,1629819760,-121.9091,37.3436,152.4,false,62.26,317.34,-5.53,null,121.92,null,false,0],["aa7e56","UAL2096 ","United States",1629819759,1629819759,-122.455,37.5869,3421.38,false,149.96,190.08,17.23,null,3512.82,"1762",false,0],["a80a97","SKW5493 ","United States",1629819759,1629819760,-122.4706,37.5073,3573.78,false,166.54,172.55,11.38,null,3710.94,"6301",false,0],["a2abda","SKW146V ","United States",1629819692,1629819692,-121.9301,37.3691,null,true,0,47.81,null,null,null,null,false,0],["abb5bf","SWA3326 ","United States",1629819756,1629819757,-122.2137,37.7086,null,true,0,98.44,null,null,null,null,false,0],["aa2bc4","UAL1400 ","United States",1629819561,1629819561,-122.3819,37.6132,null,true,6.17,208.12,null,null,null,null,false,0],["aa7b10","SWA3100 ","United States",1629819759,1629819760,-121.9014,37.6073,1569.72,false,116.26,270,-4.23,null,1584.96,"2057",false,0],["aaa9fb","SWA3987 ","United States",1629819747,1629819752,-122.2134,37.7093,null,true,0,126.56,null,null,null,null,false,0],["abeb7c","SWA2650 ","United States",1629819758,1629819758,-122.2139,37.7118,null,true,0,11.25,null,null,null,null,false,0],["a57f42","SWA853  ","United States",1629819759,1629819760,-121.8345,37.3716,2697.48,false,146.59,138.98,16.58,null,2758.44,"1740",false,0],["a74a5a","SWA1079 ","United States",1629819757,1629819757,-122.2146,37.7112,null,true,0,317.81,null,null,null,null,false,0],["ad7f3a","SKW6002 ","United States",1629819760,1629819760,-122.3471,37.7662,1661.16,false,143.16,18.43,18.21,null,1691.64,"3243",false,0],["a12d67","SKW3467 ","United States",1629819759,1629819759,-121.9307,37.3679,null,true,10.29,137.81,null,null,null,"1337",false,0],["a54c60","UAL2194 ","United States",1629819756,1629819756,-122.3879,37.6229,null,true,6.43,118.12,null,null,null,null,false,0],["a9586e","SKW5575 ","United States",1629819548,1629819548,-122.3821,37.613,null,true,6.43,208.12,null,null,null,null,false,0],["a67b81","ASA338  ","United States",1629819478,1629819478,-121.9271,37.3665,null,true,2.06,50.62,null,null,null,"0631",false,0],["a8e8dd","N673WM  ","United States",1629819759,1629819759,-122.2008,37.7235,15.24,false,64.58,292.48,-3.9,null,-7.62,"4564",false,0],["a04035","N115QS  ","United States",1629819757,1629819757,-122.3847,37.6274,null,true,0.06,298.12,null,null,null,null,false,0],["aa5fc2","N768FE  ","United States",1629819759,1629819760,-122.096,37.6908,594.36,false,88.99,288.54,-6.5,null,579.12,"6322",false,0],["a46b6e","N384PC  ","United States",1629819556,1629819562,-122.2512,37.5148,null,true,0,315,null,null,null,"4271",false,0],["a5050e","SWA3650 ","United States",1629819760,1629819760,-121.9928,37.6062,1173.48,false,98.82,268.21,-4.55,null,1181.1,"6072",false,0],["a06435","SKW4740 ","United States",1629819759,1629819760,-121.8444,37.499,2301.24,false,133.38,258.43,-6.83,null,2354.58,"2307",false,0],["a59b9c","SWA1637 ","United States",1629819746,1629819759,-122.213,37.7096,null,true,0,126.56,null,null,null,null,false,0],["ad8872","N971MC  ","United States",1629819732,1629819741,-122.3845,37.6276,null,true,0,298.12,null,null,null,"6567",false,0],["abf8ff","SWA4549 ","United States",1629819741,1629819742,-122.213,37.7113,null,true,0,56.25,null,null,null,null,false,0],["ac8b2e","SWA2238 ","United States",1629819759,1629819759,-122.2144,37.7095,null,true,4.89,36.56,null,null,null,"6746",false,0],["abc0c1","SWA4969 ","United States",1629819760,1629819760,-122.2463,37.7233,381,false,86.05,311.12,11.05,null,350.52,null,false,0]]}
          this.publishFlighsToDiffusion(mockFlights.states)
          this.setPolledMockData(mockFlights);*/
          //this.startPollingFlights();               
          DataSourceFeeder.startPolling(3000, this.$store)
        }
    );      
  }
}
</script>