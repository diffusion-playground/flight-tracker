<template>    
    <div v-if="event.competitions && event.competitions.length > 0" class="event-container">
        <a class="nba-event" href="#" @click="onEventClick" :data-id="event.competitions[0].id">        
            <TemplatesNbaListTeam :competitor="event.competitions[0].competitors[1]" />             
            <TemplatesNbaListTeam :competitor="event.competitions[0].competitors[0]" :isAt="true" />
            <TemplatesNbaEventShortDetail :eventType="event.status.type" />
        </a>
        <TemplatesNbaEventExtendedInfo :event="event" v-if="showExtendedInfo" />
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
            this.toggleExtendedInfo(evt)
            /* The following is needed so it gives the extended info time to render*/
            setTimeout(() => { this.updateSavingsPercentage() }, 500)
            this.$emit('event-clicked', evt)
        },
        toggleExtendedInfo() {            
            this.showExtendedInfo = !this.showExtendedInfo
        },
        updateSavingsPercentage() {            
            this.$store.commit('nba/setShowAll', document.querySelectorAll('.extended-info').length > 0 ? false : true)
        }
    }
})
</script>
<style scoped>
.event-container {
    width: 100%;
}
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