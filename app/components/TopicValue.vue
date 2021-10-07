<template>
    <div :style="{'flex-grow':'2'}" class="tree-section">
        <h5>{{ selectedTopic }}</h5>        
        <vue-json-pretty :path="`state`" :data="this.currentValue" :style="{'overflow': 'auto'}"> </vue-json-pretty>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
export default ({
    data() {
        return {
            currentValue: 'No Value'
        }
    },
    props: ['lastTopic', 'lastValue', 'selectedTopic'],
    methods: {
        ...mapActions('diffusion', ['getTopicValue', 'getTreeTopicValue']),
        async setTopicValue(topicPath) {    
            if (topicPath === '/REST/opensky-network.org') {
                this.currentValue = await this.getTreeTopicValue()
                return
            }
            topicPath = topicPath.split('/')
            const flightCallout = topicPath[topicPath.length - 1]
            this.currentValue = await this.getTopicValue(flightCallout) ?? { value: "No Value"}
        }
    },
})
</script>
<style scoped>
    .vjs-tree {
        height: 320px;
    }
</style>
