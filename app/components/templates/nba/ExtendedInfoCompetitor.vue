<template>
    <div class="extended-competitor">
        <img class="nba-extended-logo" v-if="isNotAt" :src="competitor.team.logo" />
        <div class="extended-score" ref="scoreAt" v-if="isAt">{{displayScore}}</div>
        {{competitor.team.displayName}}
        <div class="extended-score" ref="scoreHome" v-if="isNotAt">{{displayScore}}</div>
        <img class="nba-extended-logo" v-if="isAt" :src="competitor.team.logo" />        
    </div>
</template>
<script>
export default ({
    props: ['competitor', 'isAt', 'isNotAt'],
    data() {
        return {
            lastScore: 0
        }
    },
    computed: {
        displayScore() {
            if (this.lastScore !== this.competitor.score) {                
                this.highlightScore()
                this.lastScore = this.competitor.score
            }
            return this.lastScore
        }
    },
    methods: {
        highlightScore() {            
            this.$refs.scoreAt ? this.$refs.scoreAt.classList.add('highlighted') : null
            this.$refs.scoreHome ? this.$refs.scoreHome.classList.add('highlighted') : null            
            setTimeout(this.unHighlightScore, 2000)
        },
        unHighlightScore() {
            this.$refs.scoreAt ? this.$refs.scoreAt.classList.remove('highlighted') : null
            this.$refs.scoreHome ? this.$refs.scoreHome.classList.remove('highlighted') : null            
        }
    }
})
</script>
<style scoped>
.extended-competitor {
    margin: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.nba-extended-logo {
    width: 48px;
}
.extended-score {
    margin: 15px;
    font-size: 1.5rem;
    font-weight: 700;
}

.extended-score.highlighted {
    background-color: lightgreen;
}
</style>