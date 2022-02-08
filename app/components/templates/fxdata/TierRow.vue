<template>
    <span class="tierContainer">
        <div class="cell"><input type="radio" :checked="selected" name="tier" @click="tierChecked" :data-idx="tier.idx"/> Tier {{tier.idx}}</div>
        <div class="cell offer"><span ref="displayOffer">{{displayOffer}}</span> / <span ref="displayPoints">{{displayOfferPoints}}</span></div>
        <div class="cell bid"><span ref="displayBid">{{displayBid}}</span> / <span ref="displayBidPoints">{{displayBidPoints}}</span></div>
        <div class="cell">{{displayHigh}}</div>
        <div class="cell">{{displayLow}}</div>
        <div class="cell">{{displayOpen}}</div>
    </span>
</template>
<script>
export default ({
    props: ['pairName', 'tier'],
    data() {
        return {
            offer: 0,
            offerPoints: 0,
            bid: 0,
            bidPoints: 0,
            high: 0,
            low: 0,
            open: 0
        }        
    },
    computed: {
        displayOffer() {            
            this.offer = this.getValue(this.offer, this.tier.offer.big, 'displayOffer')
            return this.offer.toFixed(2)
        },
        displayOfferPoints() {
            this.offerPoints = this.getValue(this.offerPoints, this.tier.offer.points, 'displayPoints')
            return this.offerPoints.toFixed(2)
        },
        displayBid() {
            this.bid = this.getValue(this.bid, this.tier.bid.big, 'displayBid')
            return this.bid.toFixed(2)
        },
        displayBidPoints() {
            this.bidPoints = this.getValue(this.bidPoints, this.tier.bid.points, 'displayBidPoints')
            return this.bidPoints.toFixed(2)
        },
        displayHigh() {
            this.high = this.getValue(this.high, this.tier.high)
            return this.high.toFixed(2)
        },
        displayLow() {
            this.low = this.getValue(this.low, this.tier.low)
            return this.low.toFixed(2)
        },
        displayOpen() {
            this.open = this.getValue(this.open, this.tier.open)
            return this.open.toFixed(2)
        },
        selected() {
            return this.tier.idx === 1? 'checked':''
        }
    },
    methods: {
        getValue(current, newValue, el) {            
            if (current !== parseFloat(newValue)) {
                current = parseFloat(newValue)
                el? this.highlightEl(el) : null
            }
            return current
        },
        highlightEl(el) {                        
            this.$refs[el] ? this.$refs[el].classList.add('highlighted') : null
            setTimeout(this.unHighlightEl, 2000, el)
        },
        unHighlightEl(el) {
            this.$refs[el] ? this.$refs[el].classList.remove('highlighted') : null          
        },
        tierChecked(el) {
            const tierNumber = el.currentTarget.dataset.idx
            console.log('Tier Selected: ', tierNumber)
            this.$store.commit('fxdata/setTier', tierNumber)
        }
    }
})
</script>
<style scoped>
hr {
    border: 1px solid #FFFFFF;
}
.tierContainer {
    display: flex;
    justify-content: flex-start;    
    background-color: #EDF6FB;
    border: 1px solid #FFFFFF;     
    width: 100%;
}
.cell {
    padding: 5px;
    align-self: center;            
    text-align: center;
    flex-grow: 1;
}
.offer, .bid {
    width: 15%;
}

.offer span.highlighted, .bid span.highlighted {
    background-color: lightgreen;
}
</style>