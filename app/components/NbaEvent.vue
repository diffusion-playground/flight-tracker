<template>    
    <div>
        <a class="nba-event" href="#" @click="onEventClick">        
            <NbaListTeam :competitor="event.competitions[0].competitors[1]" />             
            <NbaListTeam :competitor="event.competitions[0].competitors[0]" :isAt="true" />
            <EventShortDetail :eventType="event.status.type" />
        </a>
        <NbaEventExtendedInfo v-if="showExtendedInfo" :event="event" />
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