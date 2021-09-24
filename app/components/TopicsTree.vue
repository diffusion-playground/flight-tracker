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
                console.log('Topics: ', results)
                this.topicsTree = new FlightTrackerTree('#topicsTree')
                /*this.topicsTree.createDataTreeFromResults(results)
                this.topicsTree.showTreeFromResults(results, () => {})*/
                //this.topicsTree.showTreeFromData(results)
                this.topicsTree.showTreeFromResults(results)
                this.treeLoaded = true
            }
        }
    }    
})
</script>