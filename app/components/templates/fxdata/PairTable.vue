<template>
    <div class="pairRowContainer">
        <div class="pairRow">
            <div class="currency header">Currency Pair</div>
            <div class="offer header">Offer Tier {{currentTier}}</div>
            <div class="bid header">Bid Tier {{currentTier}}</div>
        </div>                
        <a href="#" class="pairRow" v-for="pair in data" :key="pair.pairName" @click="onPairClicked" :data-pairname="pair.pairName">
            <TemplatesFxdataPairRow :pair="pair" />
        </a>        
    </div>
</template>
<script>
export default ({
    props: ['data'],
    computed: {
        currentTier() {
            return this.$store.state.fxdata.currentTier
        }
    },
    methods: {
        onPairClicked(e) {
            e.preventDefault();            
            this.$store.commit('fxdata/setPairName', e.currentTarget.dataset.pairname)
            let pair = this.data.find(pair => pair.pairName === e.currentTarget.dataset.pairname)
            this.$emit(`pairClicked`, pair)
        }        
    }        
})
</script>
<style scoped>
.pairRowContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.pairRow {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    width: 100%;
}
.pairRow div {
    padding: 10px;    
    border: 1px solid #FFFFFF;
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
</style>
