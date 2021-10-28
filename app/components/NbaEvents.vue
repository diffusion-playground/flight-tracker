<template>
    <div class="match-list">
        <h3>Select a match</h3>        
        <div class="nba-events">
            <div v-for="event in events" :key="event.id">
                <NbaEvent :event="event" />
            </div>
        </div>
    </div>
</template>
<script>
export default ({    
    computed: {
        events() {
            return this.$store.state.nba.events;
        }
    }
})
</script>
<style scoped>
h3 {
    margin: 44px 0 5px;
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
