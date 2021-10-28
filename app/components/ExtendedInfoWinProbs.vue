<template>
    <div class="win-probability" v-if="competition.situation">
        <div class="title">Win Probability</div>
        <div class="probabilities">
            <img class="nba-logo" :src="competition.competitors[1].team.logo" />
            <div class="win-percentages">
                <div>Away Wins: <span class="win-percentage">{{awayWinPercentage}}%</span></div>
                <div :style="{'margin':'0 5px'}">|</div>
                <div>Home Wins: <span class="win-percentage">{{homeWinPercentage}}%</span></div>
            </div>
            <img class="nba-logo" :src="competition.competitors[0].team.logo" />
        </div>
    </div>    
</template>
<script>
export default ({
    props: ['competition'],
    methods: {
        getPercentage(value) {
            return (value * 100)
        }
    },
    computed: {
        awayWinPercentage() {
            return this.getPercentage(parseFloat(this.competition.situation.lastPlay.probability.awayWinPercentage)).toFixed(2)            
        },
        homeWinPercentage() {
            return this.getPercentage(parseFloat(this.competition.situation.lastPlay.probability.homeWinPercentage)).toFixed(2)            
        }
    }
})
</script>

<style scoped>
.win-probability {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    margin: 10px 0 10px;
}

.title {    
    font-size: 2rem;
    align-self: center;
}

.nba-logo {
    width: 24px;
}

.probabilities {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.win-percentages {
    display: flex;
    justify-content: space-between;
    padding-top: 5px;
}

.win-percentage {
    font-weight: bold;
}
</style>