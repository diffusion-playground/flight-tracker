<template>
    <div :style="{'flex-grow': '1'}">        
        <h5>TopicsTree</h5>
        <div id="topicsTree"></div>
    </div>
</template>
<script>
import FlightTrackerTree from '../api/flight-tracker-tree.js'

export default ({
    data() {
        return {
            topicsTree: null,
            treeLoaded: false
        }
    },
    methods: {
        async show() {
            if (!this.treeLoaded) {
                const results = await this.$diffusionService.fetchInitialValues('?REST//')                
                this.topicsTree = new FlightTrackerTree('#topicsTree')
                this.topicsTree.showTreeFromData(results)
                this.treeLoaded = true
            }
        }
    }    
})
</script>