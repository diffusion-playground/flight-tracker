<template>
    <span :class="elClass + ' incoming-data'">
        <p class="data-savings" v-if="elClass === 'incoming-green'">{{dataSavingsPercentage}}% Data savings</p>
        <p class="no-data-savings" v-if="elClass === 'incoming-red' && showLegend">0% Data savings</p>
        <img src="~/assets/images/gauge_red.png" v-if="elClass === 'incoming-red'"/>
        <img src="~/assets/images/gauge_green.png" v-if="elClass === 'incoming-green'"/>
        <p>{{value}} bytes</p>
    </span>
</template>
<script>
export default ({
    props: ['value', 'elClass', 'showLegend'],
    computed: {    
        dataSavingsPercentage() {            
            return this.$store.state.app.config ? this.$store.state.app.config.getSavingsPercentage(this.$store) : 0
        }
    },
})
</script>
