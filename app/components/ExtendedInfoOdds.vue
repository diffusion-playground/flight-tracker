<template>
    <div class="extended-info-odds" v-if="competition.odds">
        <div class="odds-column">            
            <div class="odds-bold">ODDS</div>
        </div>
        <div class="odds-column">
            <div class="odds-regular">SPREAD</div>
            <div class="odds-bold">{{competition.odds[0].details}}</div>
        </div>
        <div class="odds-column">
            <div class="odds-regular">OVER/UNDER</div>
            <div class="odds-bold">{{competition.odds[0].overUnder}}</div>
        </div>
    </div>
</template>
<script>
export default ({
    props: ['competition']
})
</script>
<style scoped>
.extended-info-odds {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin: 5px 0 10px;
}

.odds-column {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.odds-bold, .odds-regular {
    align-self: flex-end;
}

.odds-regular {
    color: gray;
}

.odds-bold {
    color: #1C376C;
    font-size: 1.5rem;
    font-weight: 700;
}
</style>
