<template>
    <div class="flight-map" id="flightTracker">        
        <div class="map-wrap">        
            <client-only>
                <l-map 
                    :zoom="7" 
                    :minZoom="7"
                    :center="[33.70,-100.50]" 
                    :maxBounds="[[31, -122],[35, -115]]"
                    v-on:zoomed="getMapBounds(this)"
                    :options="{preferCanvas: true}"
                >
                    <l-tile-layer 
                        :url="url" 
                        :attribution="attribution"
                    />
                    <v-marker-cluster
                        :options="{
                            showCoverageOnHover: false,
                            singleMarkerMode: true,
                            maxClusterRadius: 40
                        }"
                    >
                        <template v-for="flight of flights">
                            <l-marker :lat-lng="[ flight[6], flight[5]]" v-bind:key="flight[0]" :title="flight[1]">
                                <l-icon                                
                                    :iconSize="[16,16]"                                                               
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" :transform="getRotation(flight[10])">
                                        <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="#203C71"/>
                                    </svg>
                                </l-icon>
                                <l-tooltip :options="{ permanent: false, interactive: false }">
                                <div>
                                    Callsign: {{flight[1]}}
                                </div>
                                </l-tooltip>
                            </l-marker>
                        </template>       
                    </v-marker-cluster>             
                </l-map>
            </client-only>
        </div>
        <div class="table-wrap">
            <client-only>
                <TemplatesFlightsTable :flights="flights" />
            </client-only>
        </div>
    </div>
</template>
<script>               
    export default {
        props: ['airlinesFilter', 'speedFilter', 'altitudeFilter'],
        computed: {
            flights() {                                
                const computed = (
                                // At last filter By Speed 
                                this.getFilteredFlights(                                    
                                    // Then filter by Altitude
                                    this.getFilteredFlights(
                                        // Airlines filtered first
                                        this.getFilteredFlights(
                                            this.$store.state.flights.subscribedFlights, 
                                            this.airlinesFilter, this.filterAirlines // Airlines filter & function
                                        ),
                                        this.altitudeFilter, this.filterAltitude // Altitude filter & function
                                    ),
                                    this.speedFilter, this.filterSpeed // Speed filter & function
                                )
                                ).slice(0,100)     
                return computed
            }
        },
        data() {
            return {
                zoom: 9,
                url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                attribution:
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                iconSize: 16,                
                thisSelect: 'thisSelect'
            };
        },
        methods: {            
            getFilteredFlights(data, filter, filterFn) {                
                return filter !== '--ALL--' ?
                        data.filter(flight => filterFn(flight, filter))
                        : data.filter(flight => this.filterAllFn(flight))
            },
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
            },
            getRotation(trueTrack) {
                return `rotate(${trueTrack})`
            },
            filterAllFn(flight) {
                const isValid = flight[6] !== null && flight[5] !== null
                return isValid
            },
            getMapBounds(map) {
                console.log('Zoomed')
                //getBounds
            },
            moveFlightTrackerToCenter() {            
                const el = document.getElementById('flightTracker')
                const newParent = document.getElementById('templateMoreData')
                el.parentNode.removeChild(el)
                newParent.innerHTML = '';
                newParent.appendChild(el)
            }
        },
        mounted() {
            console.log('Flight tracker mounted')
            this.moveFlightTrackerToCenter()
        },
    }
</script>
<style>
.planeIcon {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z' fill='%23203C71'/%3e%3c/svg%3e");
    width: 0px;
    height: 0px;
}
</style>
