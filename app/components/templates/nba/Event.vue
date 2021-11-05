<template>    
    <div v-if="event.competitions && event.competitions.length > 0">
        <a class="nba-event" href="#" @click="onEventClick">        
            <TemplatesNbaListTeam :competitor="event.competitions[0].competitors[1]" />             
            <TemplatesNbaListTeam :competitor="event.competitions[0].competitors[0]" :isAt="true" />
            <TemplatesNbaEventShortDetail :eventType="event.status.type" />
        </a>
        <TemplatesNbaEventExtendedInfo :event="event" />
    </div>
</template>
<script>
export default ({
    props: ['event'],
    data() {
        return {
            showExtendedInfo: false,
            extendedGames: []
        }
    },
    methods: {
        onEventClick(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            this.showExtendedInfo = this.showExtendedInfo? false:true
            /* The following is needed so it gives the extended info time to render*/
            setTimeout(() => { this.updateSavingsPercentage() }, 500)
        },
        updateSavingsPercentage() {            
            this.$store.commit('nba/setSavingsPercentage', document.querySelectorAll('.extended-info').length > 0 ? 99 : 78)
            this.$store.commit('nba/setShowAll', document.querySelectorAll('.extended-info').length > 0 ? false : true)
        }
    }
})
</script>
<style scoped>
.nba-event {
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    width: 27rem;
    background-color: aliceblue;
}
a:hover {
    background-color: lightgray !important;
}
a.nba-event:hover {
    color: #000 !important;
}
</style>