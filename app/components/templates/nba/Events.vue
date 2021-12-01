<template>
    <div class="match-list">
        <h3>Select a match</h3>        
        <div class="nba-events">
            <div v-for="event in events" :key="event.id">
                <TemplatesNbaEvent :event="event" @event-clicked="onEventClicked" />
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
            modalCompetitionId: null
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
            /*this.$refs.sportsBook.toggle(evt.currentTarget)            */
            this.$store.commit('nba/setCompetitionId', evt.currentTarget.dataset.id)
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
