<template>
    <div class="flight-map">
        <FTSelect
            :options="options"
            :selected="selected"
            :name="thisSelect"
            v-on:valuechanged="onSelectChanged"
        ></FTSelect>
        <div class="map-wrap">        
            <client-only>
                <l-map 
                    :zoom="7" 
                    :minZoom="7"
                    :center="[33.70,-117.50]" 
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
                <FlightsTable :flights="flights" />
            </client-only>
        </div>
    </div>
</template>
<script>               
    export default {
        props: ['options', 'selected', 'filterFn'],
        computed: {
            flights() {
                const computed = (
                                    this.selectedFilter !== '--ALL--' ?
                                    this.$store.state.diffusion.subscribedFlights.filter(flight => this.filterFn(flight, this.selectedFilter))
                                    : this.$store.state.diffusion.subscribedFlights.filter(flight => this.filterAllFn(flight))
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
                selectedFilter: '--ALL--',
                thisSelect: 'thisSelect'
            };
        },
        methods: {
            onSelectChanged(selected) {
                console.log('Selected: ', selected)
                this.selectedFilter = selected                
                if (selected === '--ALL--') {
                    this.$store.commit('flights/setShowAll', true);
                } else {
                    this.$store.commit('flights/setShowAll', false);
                }
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
            }
        }
    }
</script>
<style>
.planeIcon {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z' fill='%23203C71'/%3e%3c/svg%3e");
    width: 0px;
    height: 0px;
}
</style>
