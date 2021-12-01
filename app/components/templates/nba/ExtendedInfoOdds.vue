<template>
    <div class="extended-info-odds" v-if="competition.odds">
        <div class="odds-column">            
            <div class="odds-bold">ODDS</div>
        </div>
        <div class="odds-column">
            <div class="odds-regular">SPREAD</div>
            <div class="odds-bold" ref="spread">{{displaySpread}}</div>
        </div>
        <div class="odds-column">
            <div class="odds-regular">OVER/UNDER</div>
            <div class="odds-bold" ref="overUnder">{{displayOverUnder}}</div>
        </div>
    </div>
</template>
<script>
export default ({
    props: ['competition'],
    data() {
        return {
            spread: '',
            overUnder: ''
        }
    },
    computed: {
        displaySpread() {            
            if (this.competition.odds) {                                
                if (this.spread != this.competition.odds[0].details) {
                    this.highlight(this.$refs.spread)
                }
                this.spread = this.competition.odds[0].details
                return this.spread
            }
            return ''
        },
        displayOverUnder() {
            if (this.competition.odds) {                                
                if (this.overUnder != this.competition.odds[0].overUnder) {
                    this.highlight(this.$refs.overUnder)
                }
                this.overUnder = this.competition.odds[0].overUnder
                return this.overUnder
            }
            return ''
        }
    },
    methods: {
        highlight(el) { 
            if (el) {
                el.classList.add('highlighted')
                setTimeout(this.unHighlight, 2000)
            }
        },
        unHighlight() {
            this.$refs.spread.classList.remove('highlighted')
            this.$refs.overUnder.classList.remove('highlighted')            
        }
    }
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

.odds-bold.highlighted {
    background-color: lightgreen;
}
</style>
