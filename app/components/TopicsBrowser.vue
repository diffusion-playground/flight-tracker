<template>
    <div class="d-start-flex" :style="{'width': '98%'}">
        <TopicsTree ref="topicsTree" />
        <TopicValue ref="topicValue" :selectedTopic="currentSubscribedPath" :lastTopic="lastTopic" :lastValue="lastTopicValue" />
    </div>
</template>
<script>
import FlightTrackerTree from '../api/flight-tracker-tree.js'
export default {
    data() {
        return {
            topicsTree: null,
            treeLoaded: false,
            currentSubscribedPath: null,
            lastMessage: 'No Value'
        }
    },
    computed: {
        lastTopic() {                    
            return `/${this.$store.state.diffusion.lastTopicReceived}`
        },
        lastTopicValue() {
            return `/${this.$store.state.diffusion.lastMessage}`
        }
    }, 
    methods: {
        async show() {
            if (!this.treeLoaded) {
                const results = await this.$diffusionService.fetchInitialValues('?REST//')                
                this.topicsTree = new FlightTrackerTree('#topicsTree')
                            .setSubscribeCallback(data => this.onSubscribe(data))
                            .showTreeFromData(results)                
                this.treeLoaded = true
            }
        },
        onSubscribe(data) {                        
            this.currentSubscribedPath = data.path.trim()
            this.$refs.topicValue.setTopicValue(this.currentSubscribedPath)
        }
    }
}
</script>

