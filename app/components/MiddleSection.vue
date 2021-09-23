<template>
    <div class="main-col middle no-border" style="width: 20%">
        <SectionHeader title="Enrich" subTitle="">
            Transform the event-data using <a :href="dslLink" target="_blank">DSL (a declarative language)</a> in Diffusion.
        </SectionHeader>
            
        <CloudOnPremiseToggle />
            
        <img class="flow-arrow-right" src="~/assets/images/arrow-right.svg">
        <p class="flow-arrow-right-text">All real-time data wrangling is done by Diffusion on-the-fly, so that you only publish what’s needed and not all your event data stream </p>
        <a href="#" class="btn" @click="showModal = true">Show Topic Tree</a>
        <Modal v-show="showModal" @close-modal="showModal = false" :width="80" :height="500">
            <TopicsBrowser />
        </Modal>
    </div>
</template>
<script>
export default ({
    data() {
        return {
            showModal: false,
            dslLink: 'https://docs.pushtechnology.com/docs/latest/manual/html/designguide/data/topictree/topic_views.html'
        }
    }
})
</script>
