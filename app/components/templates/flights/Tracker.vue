<template>
    <div>
        <TemplatesFlightsFlightTracker 
              v-bind:options="byAirline" 
              v-bind:selected="byAirline[1].value"
              :selectionName="byAirline"
              :filterFn="filterAirlines"
            />
          <hr>
          <TemplatesFlightsFlightTracker 
            v-bind:options="byAltitude" 
            v-bind:selected="byAltitude[1].value"
            :selectionName="byAltitude"
            :filterFn="filterAltitude"
          />
          <hr>
          <TemplatesFlightsFlightTracker  
            v-bind:options="bySpeed" 
            v-bind:selected="bySpeed[1].value"
            :selectionName="bySpeed"
            :filterFn="filterSpeed"
          />
    </div>
</template>
<script>
export default ({
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
            value: 'DAL',
            text: 'Delta Airlines',        
        },
        {
            value: 'N',
            text: 'Private',        
        },
        {
            value: 'SKW',
            text: 'Skywest Airlines',        
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
    methods: {
        /** Filter Airlines */
        filterAirlines(flight, selectedFilter) {                     
          return flight[1] && flight[1].substr(0,selectedFilter.length) === selectedFilter && this.latLongIsValid(flight)
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
            console.log('Speed: ', flight, typeof flight[0])               
            if (typeof flight[0] !== 'string') {
                console.log('This is not a flight');
                return // This is not a flight
            }
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
    computed: {
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
    }
})
</script>
