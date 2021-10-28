<template>
    <span :class="elClass + ' incoming-data'">
        <p class="data-savings" v-if="elClass === 'incoming-green'">{{dataSavingsPercentage}}% Data savings</p>
        <img src="~/assets/images/gauge_red.png" v-if="elClass === 'incoming-red'"/>
        <img src="~/assets/images/gauge_green.png" v-if="elClass === 'incoming-green'"/>
        <p>{{value}} bytes</p>
    </span>
</template>
<script>
export default ({
    props: ['value', 'elClass'],
    computed: {    
        dataSavingsPercentage() {
            /* TODO: make this function open for extension, closed for change, taking into account other templates */
            return this.$store.state.app.config ? this.$store.state.app.config.getSavingsPercentage(
                () => true,
                this.$store.state.nba.savingsPercentage,
                this.$store.state.nba.savingsPercentage
            ) : 0
        }
    },
})
</script>
