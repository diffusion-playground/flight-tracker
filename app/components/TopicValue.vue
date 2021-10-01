<template>
    <div :style="{'flex-grow':'3'}">
        <h5>{{ selectedTopic }}</h5>        
        <vue-json-pretty :path="`state`" :data="this.currentValue"> </vue-json-pretty>
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
        ...mapActions('diffusion', ['getTopicValue']),
        async setTopicValue(topicPath) {            
            topicPath = topicPath.split('/')
            const flightCallout = topicPath[topicPath.length - 1]
            this.currentValue = await this.getTopicValue(flightCallout) ?? { value: "No Value"}
        }
    },
})
</script>
