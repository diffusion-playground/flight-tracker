<template>
    <div class="leaderboard" v-if="competition">        
        <div class="lb-header">
            <div v-for="header in competition.competitors[0].leaders" :key="header.shortDisplayName">{{header.displayName}}</div>
        </div>
        <div class="lb-team" v-for="competitor in competition.competitors.slice().reverse()" v-bind:key="competitor.id">
            <img class="localAvatar" :src="competitor.team.logo"/>            
            <div class="leaders" v-for="leader in competitor.leaders" :key="leader.shortDisplayName">                
                <transition name="bounce">
                <div class="leader" v-for="leaderIn in leader.leaders" :key="leaderIn.value">                                                            
                    <img class="localAvatar" :src="leaderIn.athlete.headshot"/>                    
                    <div class="l-data">
                        <div class="l-name"><div>{{leaderIn.athlete.displayName}}<span>({{leaderIn.athlete.position.abbreviation}})</span></div></div>
                        <div class="l-score">
                            <div class="l-score-value">{{leaderIn.value.toFixed(2)}}</div>
                            <div class="l-score-desc">{{leader.shortDisplayName}}</div>
                        </div>
                    </div>                    
                </div>    
                </transition>            
            </div>            
        </div>
    </div>
</template>
<style scoped>
    .leaderboard {
        display: flex;
        flex-direction: column;
        padding: 5px;
    }
    .lb-team, .lb-header {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;        
    }
    .lb-header {    
        display: flex;
        flex-direction: row;    
        margin-left: 48px;
    }
    .lb-header div {        
        width: 25%;
        margin-left: 15px;
        padding: 10px;
        text-align: left;
        color: gray;
    }
    .leaders {
        display: flex;
        flex-direction: row;        
        width: 25%;
        margin-left: 15px;
        padding: 10px;    
    }
    .lb-team:nth-child(2) .leaders {
        border-bottom: 1px solid lightgray;
    }
    .leader {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        justify-items: center;
        align-items: center;
        overflow: hidden;
    }
    .l-data {
        display: flex;        
        flex-direction: column;
        align-content: center;
        margin-left: 8px;        
        max-width: 150px;
    }
    .l-data div {
        align-self: center;
        font-size: 0.6rem;
    }
    .l-score {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .l-name, .l-score-value {
        font-weight: bold;
        display: flex;
        align-items: center;
    }
    .l-name div {
        margin-right: 5px;
    }
    .l-name span {
        font-size: 0.5rem;
        margin-left: 5px;
        color: #4bade9;
        font-weight: bold;
    }
    .l-name small, .l-score-desc {
        color: gray
    }
    .l-score-desc {
        text-transform: uppercase;   
        font-weight: bold;
    }

    .localAvatar {
        vertical-align: middle;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: #EDF6FB;
        border: 1px solid #4bade9;
    }

    .bounce-enter-active {
        animation: bounce-in .8s;
        background-color: lightgreen;
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        30% {
            transform: scale(0.6);
        }
        50% {
            transform: scale(1.1);
        }
        80% {
            transform: scale(0.6);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
<script>
import {mapActions} from 'vuex'

export default ({
    props: ['conpetitionId'],
    data() {
        return {
            competitionData: null
        }
    },
    computed: {
        competition() {                        
            const comp = this.$store.state.nba.events.find(nbaEvent => nbaEvent.competitions[0].id === this.$store.state.nba.selectedCompetitionId)
            if (comp) {                                
                this.competitionData = comp.competitions[0]
                return comp.competitions[0]
            }
            return comp
        }
    },
    methods: {
        ...mapActions('nba', ['getCompetition'])
    },
    mounted() {

    }
})
</script>