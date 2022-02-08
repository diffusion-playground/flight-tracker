<template>
    <div class="win-probability" v-if="competition.situation">
        <div class="title">Win Probability</div>
        <div class="probabilities">
            <img class="nba-logo" :src="competition.competitors[1].team.logo" />
            <div class="win-percentages">
                <div><span class="win-percentage" ref="awayPercentage">{{awayWinPercentage}}%</span></div>
                <div :style="{'margin':'0 5px'}">|</div>
                <div><span class="win-percentage" ref="homePercentage">{{homeWinPercentage}}%</span></div>
            </div>
            <img class="nba-logo" :src="competition.competitors[0].team.logo" />
        </div>
    </div>    
</template>
<script>
export default ({
    props: ['competition'],
    data() {
        return {
            hPercentage: 0,
            aPercentage: 0
        }
    },
    methods: {
        getPercentage(value) {
            return (value * 100)
        },
        highlight(el) {            
            el.classList.add('highlighted')
            setTimeout(this.unHighlight, 2000)            
        },
        unHighlight() {
            this.$refs.awayPercentage.classList.remove('highlighted')
            this.$refs.homePercentage.classList.remove('highlighted')            
        }
    },
    computed: {
        awayWinPercentage() {
            try {
                this.$refs.awayPercentage ? this.highlight(this.$refs.awayPercentage):null
                this.aPercentage = this.getPercentage(parseFloat(this.competition.situation.lastPlay.probability.awayWinPercentage)).toFixed(2)            
                return this.aPercentage
            } catch (e) {
                console.log(e)
                return 0.00
            }
        },
        homeWinPercentage() {
            try {
                this.$refs.homePercentage ? this.highlight(this.$refs.homePercentage) : null
                return this.getPercentage(parseFloat(this.competition.situation.lastPlay.probability.homeWinPercentage)).toFixed(2)            
            } catch (e) {
                return 0.00
            }
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
    font-size: 1rem;
    align-self: center;
    margin-bottom: 8px;
}

.nba-logo {
    width: 32px;
}

.probabilities {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.win-percentages {
    display: flex;
    justify-content: space-evenly;
    padding-top: 5px;
}

.win-percentage {
    font-weight: bold;
    font-size: 1rem;
}

.win-percentage.highlighted {
    background-color: lightgreen;
}
</style>