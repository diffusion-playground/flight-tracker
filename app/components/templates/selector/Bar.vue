<template>
    <div class="navbar">        
        <div class="flex-col">
            <a class="flex-col" href="#" @click="setTemplate('TemplatesNbaEvents')">
                <div class="big-sports"></div>
                <div>NBA Scoreboard</div>
            </a>
        </div>        
        
        <div class="flex-col">
            <a class="flex-col" href="#" @click="setTemplate('TemplatesFlightsTracker')">
                <div class="big-plane"></div>
                <div>Flights Tracker</div>
            </a>
        </div>        
    </div>
</template>
<script>
import Config from '../../../api/config/config'

export default {
    methods: {
        setTemplate(template) {
            const previousConfig = this.$store.state.app.config
            this.$store.commit('app/setTemplate', template)
            this.setAppConfig(template)
            this.$emit(`templatechanged`, previousConfig)
        },
        setAppConfig() {
            Config.setAppConfig(
                this.$store, 
                this.$store.state.app.template === 'TemplatesNbaEvents'? this.$NBAConfig : this.$flightTrackerConfig
            )
        }
    },
    async mounted() {
        this.$store && !this.$store.state.app.config ? this.setAppConfig('TemplatesNbaEvents') : null;
    }
}
</script>
<style scoped>
    div.big-plane, div.big-sports {
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z' fill='%23203C71'/%3e%3c/svg%3e"); 
        width: 24px;
        height: 24px;    
        align-self: center;
        margin-bottom: 0px;
        border: none;
    }
    div.big-sports {
        background-image: url('~assets/images/sports-icon.png');
        background-repeat: no-repeat;
        background-position:center;
        width: 35px;
        height: 38px;    
    }
</style>