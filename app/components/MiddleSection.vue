<template>
    <div class="main-col middle no-border" style="width: 20%">
        <SectionHeader title="Enrich" subTitle="">
            Transform the event-data using <a :href="dslLink" target="_blank">DSL (a declarative language)</a> in Diffusion.
        </SectionHeader>
            
        <CloudOnPremiseToggle />
            
        <img class="flow-arrow-right" src="~/assets/images/arrow-right.svg">
        <p class="flow-arrow-right-text">All real-time data wrangling is done by Diffusion on-the-fly, so that you only publish what’s needed and not all your event data stream </p>        
        <a href="#" class="btn" @click="onShowTopicsTree" v-if="diffusionConnected">Show Topic Tree</a>
        <Modal v-show="showModal" @close-modal="showModal = false" :width="50" :height="770">
            <div class="topic-tree-intro">
                <p>
                    You can filter and wrangle your data on-the-fly using our Topic management capability.
                    A Topìc is a container to publish data, and to subscribe to it, like a dropbox.
                    "Topic Trees" are logical structures to organize multiple Topics, like a file/folder tree.
                </p>
                <img class="topic-tree-flow" src="~/assets/images/topic_tree_flow.png">
                <p :style="{'padding': '0 50px'}">
                    Use our <b>Topic Browser</b> below to learn more on how we automatically turn a JSON stream into a comprehensive data structure you can fine-grain and subscribe to specific data points and not the whole stream, reducing latency and saving tons in data costs.
                </p>
                <h2>Diffusion Topic Tree</h2>
            </div>            
            <TopicsBrowser ref="topicsBrowser" />
        </Modal>
    </div>
</template>
<script>
export default ({
    computed: {
        diffusionConnected() {
            return this.$store.state.diffusion.connected
        } 
    },
    data() {
        return {
            showModal: false,
            dslLink: 'https://docs.pushtechnology.com/docs/latest/manual/html/designguide/data/topictree/topic_views.html'
        }
    },
    methods: {
        onShowTopicsTree() {
            this.showModal = true
            this.$refs.topicsBrowser.show()
        }
    }
})
</script>
<style>
.topic-tree-intro {
    display: flex;
    justify-content: center;
    flex-direction: column;        
}

.topic-tree-intro p {
    text-align: center;
    font-size: large;
    padding: 0 180px;
}

.topic-tree-intro h2 {
    text-align: center;
    color: #1C376C !important;
    font-size: 25px;
    margin: 5px;
}

.topic-tree-flow {
    width: 50%;
    align-self: center;
}
</style>