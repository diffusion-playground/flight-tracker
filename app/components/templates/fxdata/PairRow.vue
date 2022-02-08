<template>
    <div :class="pairRowClassList">
        <div class="currency">{{pair.pairName || 'Currency Pair'}}</div>
        <div class="offer" ref="offerValue">{{ offerValue }}</div>
        <div class="bid" ref="bidValue">{{ bidValue }}</div>
    </div>
</template>
<script>
export default ({
    props: ['pair'],
    data() {
        return {
            currentOffer: 0,
            currentBid: 0
        }
    },
    computed: {
        offerValue() {
            const currentTier = this.$store.state.fxdata.currentTier - 1
            if (this.currentOffer !== this.pair.tiers[currentTier].offer.big) {
                this.highlightOffer()
                this.currentOffer = this.pair.tiers[currentTier].offer.big
            }
            return this.currentOffer.toFixed(2)
        },
        bidValue() {
            const currentTier = this.$store.state.fxdata.currentTier - 1
            if (this.currentBid !== this.pair.tiers[currentTier].bid.big) {
                this.highlightBid()
                this.currentBid = this.pair.tiers[currentTier].bid.big
            }
            return this.currentBid.toFixed(2)
        },
        pairRowClassList() {
            return `pairRow ${this.$store.state.fxdata.currentPairName === this.pair.pairName? 'currentPair':''}`
        }
    },
    methods: {        
        highlightOffer() {            
            this.$refs.offerValue ? this.$refs.offerValue.classList.add('highlighted') : null
            setTimeout(this.unHighlightOffer, 2000)
        },
        unHighlightOffer() {
            this.$refs.offerValue ? this.$refs.offerValue.classList.remove('highlighted') : null          
        },
        highlightBid() {            
            this.$refs.bidValue ? this.$refs.bidValue.classList.add('highlighted') : null
            setTimeout(this.unHighlightBid, 2000)
        },
        unHighlightBid() {
            this.$refs.bidValue ? this.$refs.bidValue.classList.remove('highlighted') : null          
        }
    }
})
</script>
<style scoped>
.pairRow {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    width: 100%;    
}
.pairRow div {
    padding: 10px;
    padding: 5px;
    flex-grow: 1;
    align-self: center;
    text-align: center;    
    background-color: #EDF6FB;
}

.pairRow div.header {
    background-color: #4bade9;
    color: #FFFFFF;
    font-weight: bold;
    text-align: center;
}
.currency {
    width: 40%;
} 
.offer, .bid {
    width: 30%;
}

.offer.highlighted, .bid.highlighted {
    background-color: lightgreen;
}
.currentPair {
    border: 2px solid #4bade9 !important;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}
</style>
