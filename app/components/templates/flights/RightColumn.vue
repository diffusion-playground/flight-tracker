<template>
    <div class="flight-selects">
        <TemplatesFlightsFTSelect
            :options="byAirline"
            :selected="byAirline[1].value"
            :name="byAirline"
            v-on:valuechanged="onAirlinesSelectChanged"
        ></TemplatesFlightsFTSelect>       
          
        <TemplatesFlightsFTSelect
            :options="byAltitude"
            :selected="byAltitude[1].value"
            :name="byAltitude"
            v-on:valuechanged="onSpeedSelectChanged"
        ></TemplatesFlightsFTSelect>          
          
        <TemplatesFlightsFTSelect
            :options="bySpeed"
            :selected="bySpeed[1].value"
            :name="bySpeed"
            v-on:valuechanged="onAltitudeSelectChanged"
        ></TemplatesFlightsFTSelect>

        <TemplatesFlightsFlightTracker             
            :airlinesFilter="airlinesFilter" 
            :speedFilter="speedFilter"
            :altitudeFilter="altitudeFilter"
        />
    </div>
</template>
<script>
export default ({    
    mounted() {
        console.log('Flights Mounted')
        this.moveFlightTrackerToCenter()
    },
    methods: {
        onAirlinesSelectChanged(selected) {
            this.airlinesFilter = selected
            this.onSelectChanged(selected)
        },
        onSpeedSelectChanged(selected) {
            this.speedFilter = selected
            this.onSelectChanged(selected)
        },
        onAltitudeSelectChanged(selected) {
            this.altitudeFilter = selected
            this.onSelectChanged(selected)
        },
        onSelectChanged(selected) {
            console.log('Selected: ', selected)            
            if (selected === '--ALL--') {
                this.$store.commit('flights/setShowAll', true);
            } else {
                this.$store.commit('flights/setShowAll', false);
            }
        },
        moveFlightTrackerToCenter() {            
            const el = document.getElementById('flightTracker')
            const newParent = document.getElementById('templateMoreData')
            el.parentNode.removeChild(el)
            newParent.innerHTML = '';
            newParent.appendChild(el)
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
    },
    data() {
        return {
            airlinesFilter: '--ALL--',
            speedFilter: '--ALL--',
            altitudeFilter: '--ALL--',
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
    }
})
</script>
<style scoped>
.flight-selects {
    width: 100%;
}
</style>