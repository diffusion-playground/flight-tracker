<template>
    <div class="main-col middle no-border" style="width: 20%">
        <SectionHeader title="Enrich" subTitle="">
            <p>Breakdown your data and make it easy to navigate through.</p>
        </SectionHeader>
            
        <!--<CloudOnPremiseToggle />-->
        <!-- <DiffusionEnabledToggle /> -->
                                        
        <p :style="{'text-align':'center', 'width':'75%'}">Click here to view your data organized with Diffusion Topic Tree.</p>
        <DButton :dhref="`#`" :dtext="`Show Topic Tree`" :dclass="`btn mr-2 btn-primary`" @dclick="onShowTopicsTree" v-if="diffusionConnected" />

        <img class="diffusion-enabled" src="~/assets/images/diffusion-enabled.gif" />

        <Modal v-show="showModal" @close-modal="showModal = false" :width="51" :height="700">
            <div class="topic-tree-intro">
                <p>
                    You can filter and wrangle your data on-the-fly using our Topic management capability.
                    A Topìc is a container to publish data, and to subscribe to it, like a dropbox.
                    "Topic Trees" are logical structures to organize multiple Topics, like a file/folder tree.
                </p>
                <img class="topic-tree-flow" src="~/assets/images/topic_tree_flow.png">
                <p :style="{'padding': '0 10px'}">
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
        },
        diffusionEnabled() {
            return this.$store.state.diffusion.diffusionEnabled
        },
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
    font-size: 1rem;
    padding: 0 20px;
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

.open-tree-btn {
    background-image: url("data:image/svg+xml,%3Csvg width='168' height='21' viewBox='0 0 168 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.23737 1.41435C0.906934 0.915808 1.26441 0.25 1.86252 0.25H155.11C155.281 0.25 155.447 0.308456 155.581 0.415681L166.912 9.53399C167.276 9.8268 167.287 10.3774 166.935 10.684L155.581 20.5657C155.444 20.6846 155.269 20.75 155.088 20.75H1.7856C1.19949 20.75 0.839885 20.1079 1.14612 19.6081L6.56664 10.7624C6.8206 10.348 6.81128 9.82389 6.54274 9.41873L1.23737 1.41435Z' fill='%234BADE9' stroke='black' stroke-width='0.5'/%3E%3C/svg%3E");
    width: 250px;
    height: 31px;
    background-repeat: no-repeat;
    background-size: contain;
    color: #FFF !important;
    text-align: center;
    padding-top: 6px;
}

.open-tree-btn:hover {
    color: #FFF !important;
}
.wrangling-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
}

.diffusion-enabled, .diffusion-disabled {
    width: 100%;
    margin-top: 15px;
}
</style>