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
        ...mapActions('nba', ['getTopicValue', 'getTreeTopicValue']),
        async setTopicValue(topicPath) {    
            if (topicPath === '/rest/sports/nba') {
                this.currentValue = await this.getTreeTopicValue()
                return
            }
            topicPath = topicPath.split('/')
            const topicId = topicPath[topicPath.length - 1]
            this.currentValue = await this.getTopicValue(topicId) ?? { value: "No Value"}
        },
        setTopicValueFromData(data) {            
            this.currentValue = data
        }
    },
})
</script>
<style scoped>
    .vjs-tree {
        height: 320px;
        font-family: 'Courier New', Courier, monospace;
    }
</style>
