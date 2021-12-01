<template>
    <div class="table" v-if="competition">
        <div class="col">
            <div class="header left-align">Team</div>
            <div class="team">{{competition.competitors[1].team.displayName}}</div>
            <div class="team">{{competition.competitors[0].team.displayName}}</div>            
        </div>
        <div class="col">
            <div class="header">Score</div>
            <div class="score" ref="scoreAway">{{getScoreAway}}</div>
            <div class="score" ref="scoreHome">{{getScoreHome}}</div>
        </div>
        <div class="col">            
            <div class="header">Status</div>
            <div class="status" ref="status">{{getStatus}}</div>
        </div>
        <div class="col" v-if="competition.odds">            
            <div class="header">Odds</div>
            <div class="odds" ref="odds">{{getOdds}}</div>
        </div>
        <div class="col" v-if="competition.odds">           
            <div class="header">Over/Under</div> 
            <div class="over-under" ref="overUnder">{{competition.odds ? competition.odds[0].overUnder : '-'}}</div>
        </div>
        <div class="col" v-if="competition.situation">           
            <div class="header">Win Probability</div> 
            <div class="over-under" ref="winProb">Away : <span ref="awayWinProbs">{{awayWinPercentage}}%</span> / Home: <span ref="homeWinProbs">{{homeWinPercentage}}%</span></div>
        </div>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
export default ({    
    data() {
        return {
            competitionData: null, 
            scoreAway: 0,
            scoreHome: 0,
            status: '',
            awayWinProbs: 0,
            homeWinProbs: 0,
            odds: '',
            overUnder: 0,
            highlighted: []
        }
    },
    computed: {
        getScoreAway() {
            this.scoreAway = this.detectChange(this.scoreAway, this.competitionData.competitors[1].score, this.$refs.scoreAway)
            return this.scoreAway
        },
        getScoreHome() {            
            this.scoreHome = this.detectChange(this.scoreHome, this.competitionData.competitors[0].score, this.$refs.scoreHome)
            return this.scoreHome
        },
        getStatus() {            
            this.status = this.detectChange(this.status, this.competitionData.status.type.detail, this.$refs.status)
            return this.status
        },
        getOdds() {            

            this.odds = this.competitionData.odds? this.detectChange(this.odds, this.competitionData.odds[0].details, this.$refs.odds)
                                                    : '-'
            return this.odds
        },
        getOverUnder() {            

            this.overUnder = this.competitionData.odds? this.detectChange(this.overUnder, this.competitionData.odds[0].overUnder, this.$refs.overUnder)
                                                    : '-'
            return this.overUnder
        },
        competition() {                        
            const comp = this.$store.state.nba.events.find(nbaEvent => nbaEvent.competitions[0].id === this.$store.state.nba.selectedCompetitionId)
            if (comp) { 
                this.competitionData = comp.competitions[0]
                return comp.competitions[0]
            }
            return comp

        },
        awayWinPercentage() {
            try {                
                const newProbs =  this.getPercentage(parseFloat(this.competition.situation.lastPlay.probability.awayWinPercentage)).toFixed(2)            
                if (this.awayWinProbs !== newProbs) {
                    this.awayWinProbs = newProbs
                    this.highlight(this.$refs.awayWinProbs)
                }
                return this.awayWinProbs
            } catch (e) {
                console.log(e)
                return 0.00
            }
        },
        homeWinPercentage() {
            try {                                
                const newProbs =  this.getPercentage(parseFloat(this.competition.situation.lastPlay.probability.homeWinPercentage)).toFixed(2)
                if (this.homeWinProbs !== newProbs) {
                    this.homeWinProbs = newProbs
                    this.highlight(this.$refs.homeWinProbs)
                }
                return this.homeWinProbs
            } catch (e) {
                return 0.00
            }
        }
    },
    methods: {
        ...mapActions('nba', ['getCompetition']),
        getPercentage(value) {
            return (value * 100)
        },
        detectChange(localValue, storeValue, el) {
            if (localValue !== storeValue) {
                localValue = storeValue
                this.highlight(el)
            }
            return localValue
        },
        highlight(el) { 
            if (el) {                
                el.classList.add('highlighted')
                setTimeout(this.unHighlight, 2000)
            }
        },
        unHighlight() {            
            this.$refs.scoreAway.classList.remove('highlighted')
            this.$refs.scoreHome.classList.remove('highlighted')
            this.$refs.status.classList.remove('highlighted')
            this.$refs.odds? this.$refs.odds.classList.remove('highlighted'):null
            this.$refs.overUnder? this.$refs.overUnder.classList.remove('highlighted'):null
            this.$refs.homeWinProbs? this.$refs.homeWinProbs.classList.remove('highlighted'):null
            this.$refs.awayWinProbs? this.$refs.awayWinProbs.classList.remove('highlighted'):null
        }
    }
})
</script>

<style scoped>
.table {
    display: flex;
    justify-content: flex-start;
    align-content: center;
}
.table .col{
    flex-grow: 1;
    border: 1px solid #FFFFFF;
}

.table .col div {
    padding: 10px;    
    background-color: #EDF6FB;
    border: 1px solid #FFFFFF;
}

.table .col .header{
    background-color: #4bade9;
    color: #FFFFFF;
    font-weight: bold;
    text-align: center;
}

.left-align{
    text-align: left !important;    
}

.score, .status, .odds, .over-under {
    display: flex;
    justify-content: center;
    align-items: center;    
}

.status, .odds, .over-under {    
    height: 49%;
}

.highlighted {
    background-color: lightgreen !important;
}

</style>