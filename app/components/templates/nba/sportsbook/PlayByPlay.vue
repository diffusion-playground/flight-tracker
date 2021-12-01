<template>
<div>
    <div class="pbp-title">Play By Play</div>
    <div class="quarter">{{periodDisplayString}}</div>
    <div class="pbp-table">
        <div class="header">
            <div>TIME</div>
            <div>TEAM</div>
            <div>SCORE</div>
        </div>
        <div class="rows">
            <transition-group name="list" tag="p">
                <div :class="play.hasScored? 'row scored':'row'" v-for="play in plays" :key="play.id">
                    <div>{{play.clock}}</div>
                    <div><img class="team-logo" :src="play.teamLogo"> {{play.text}}</div> <!-- competition.situation.lastplay.text -->
                    <div>{{play.score}}</div>
                </div>            
            </transition-group>
        </div>
    </div>
</div>    
</template>
<script>
export default ({
    props: ['competitionId'],
    computed: {
        plays() {
            return this.$store.state.nba.lastPlays.filter(play => play.competitionId === this.competitionId)
        },
        periodDisplayString() {
            const competitionData = this.$store.state.nba.events.find(
                nbaEvent => nbaEvent.competitions[0].id === this.$store.state.nba.selectedCompetitionId
            )
            if (competitionData) {
                const period = parseInt(competitionData.status.period)
                if (period <= 0) {
                    return ''
                }
                return `${period}${period === 1? 'st' : period === 2? 'nd' : period === 3? 'rd' : 'th' } Quarter`
            }
            return ''
        }
    },
})
</script>

<style scoped>
.pbp-title {
    font-size: 1.5rem;
    text-align: center;
    margin: 10px;
}

.quarter {
    margin: 10px 5px;
    color: gray;
}

.pbp-table {
    font-size: 0.8rem;
}

.pbp-table .header {
    font-size: 0.6rem;
    border-bottom: 1px solid lightgray;
}

.rows {
    overflow: auto;
    height: 180px;
}

.pbp-table, .header, .rows .row  {
    display: flex;
    justify-content: flex-start;    
}

.rows .row  {
    color: gray;
}

.pbp-table {
    flex-direction: column;
}

.pbp-table .header div{
    font-weight: bold;
}

.pbp-table .header div, .pbp-table .rows .row div {        
    padding: 5px;
    align-self: flex-start;
}

.pbp-table .header div:nth-child(1), .pbp-table .rows .row div:nth-child(1) {    
    width: 3%;
}

.pbp-table .header div:nth-child(2), .pbp-table .rows .row div:nth-child(2) {    
    flex-grow: 3;
    display: flex;
    align-items: center;
}

.team-logo {
    width: 16px;
    margin-right: 5px;
}

.scored {
    font-weight: bold;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
  background-color: lightgreen;
}
</style>