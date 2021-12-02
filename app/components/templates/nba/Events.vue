<template>
    <div class="match-list">
        <h3>Select a match</h3>        
        <div class="nba-events">
            <div v-for="(event, index) in events" :key="event.id">
                <TemplatesNbaEvent ref="eventItem" :event="event" :index="index" @event-clicked="onEventClicked" />
            </div>
        </div>
        <TemplatesNbaSportsbookModal ref="sportsBook" :competitionId="modalCompetitionId" @event-showespnmodal="toggleESPNModal"/>
        <TemplatesNbaSportsbookCenter ref="sportsBookCenter" :competitionId="modalCompetitionId" />        
    </div>
</template>
<script>
export default ({    
    data() {
        return {
            modalCompetitionId: null,
            initialized: false
        }
    },
    computed: {
        events() {            
            return this.$store.state.nba.events;
        }
    },
    methods: {
        onEventClicked(evt) {
            this.modalCompetitionId = evt.currentTarget.dataset.id            
            this.toggleEvent(evt.currentTarget)
            this.$store.commit('nba/setCompetitionId', evt.currentTarget.dataset.id)
        },
        toggleEvent(event) {            
            this.$refs.eventItem.map(eventItem => eventItem.toggleEvent(event.dataset.id))
        },
        toggleESPNModal() {
            this.$refs.espnModal.toggle()
        },
        moveSportsBookToCenter() {            
            const el = document.getElementById('sportsBook')
            const newParent = document.getElementById('templateMoreData')
            el.parentNode.removeChild(el)
            newParent.innerHTML = '';
            newParent.appendChild(el)
        }
    },
    mounted() {
        console.log('NBA Mounted')
        this.moveSportsBookToCenter()
    },
})
</script>
<style scoped>
h3 {
    margin: 0 0 5px;
    color: #1C376C;
}
.nba-events {    
    align-self: center;
    border-top: 1px solid lightgray;
}
.match-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
