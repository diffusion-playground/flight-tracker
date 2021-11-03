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
            
            const results = await this.$diffusionService.fetchTreeTopics(this.$store.state.app.config.getTreeTopicPath())
            console.log(results)
            this.topicsTree = new FlightTrackerTree('#topicsTree')
                        .setSubscribeCallback(data => this.onSubscribe(data))
                        .showTreeFromData(results)                
            this.treeLoaded = true
            
        },
        async onSubscribe(data) {                        
            console.log(data)
            this.currentSubscribedPath = data.path.trim()
            
            const value = await this.$diffusionService.fetchTopicValue(data.path)            

            this.$refs.topicValue.setTopicValueFromData(
                value.length > 0 ? 
                    value[0].value().get() 
                    : JSON.parse('{ "value":"No Value" }')
            )
        }

    }
}
</script>

