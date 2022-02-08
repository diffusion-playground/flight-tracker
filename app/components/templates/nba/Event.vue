<template>    
    <div v-if="event.competitions && event.competitions.length > 0" class="event-container" :class="{active: active}">
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
    props: ['event', 'index'],
    data() {
        return {
            showExtendedInfo: (this.index === 0),
            extendedGames: [],
            active: (this.index === 0)
        }
    },
    methods: {
        onEventClick(evt) {
            evt.stopPropagation();
            evt.preventDefault();            
            /* The following is needed so it gives the extended info time to render*/
            setTimeout(() => { this.updateSavingsPercentage() }, 500)
            this.$emit('event-clicked', evt)
        },        
        toggleEvent(eventId) {
            this.toggleExtendedInfo(eventId)
            this.toggleEventActive(eventId)
        },
        toggleEventActive(eventId) {          
          this.active = (eventId === this.event.id)          
        },
        toggleExtendedInfo(eventId) {          
          this.showExtendedInfo = (eventId === this.event.id)
        },
        updateSavingsPercentage() {            
            this.$store.commit('nba/setShowAll', document.querySelectorAll('.extended-info').length > 0 ? false : true)
        },        
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
    max-width: 32rem;
    background-color: aliceblue;
}
a:hover {
    background-color: lightgray !important;
}
a.nba-event:hover {
    color: #000 !important;
}

.event-container.active {    
    border: 2px solid #4bade9;        
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}
</style>