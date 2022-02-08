<template>
    <div class="fxData">
        <h3>Select a currency pair</h3>
        <TemplatesFxdataPairTable @pairClicked="onPairClicked" :data="fxData" />
        <TemplatesFxdataCenter id="fxChart" />
    </div>
</template>
<script>
export default ({
    data() {
        return {
            currentPair: null
        }
    },
    computed: {
        fxData() {            
            return this.$store.state.fxdata.pairs || {};
        },
        displayPair() {
            return this.currentPair
        }
    },
    methods: {        
        onPairClicked(selectedPair) {
            this.currentPair = selectedPair
        }
    },
    mounted() {
        console.log('FX data mounted')     
    }
})
</script>

<style scoped>
.fxData {
    width: 95%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-content: center;
    align-items: center;
}
</style>