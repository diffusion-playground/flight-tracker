<template>
    <div class="bar">
        <p class="bar-title">Select the data type you want to use:</p>
        <div class="navbar">                
            <a class="flex-col selector-btn active" ref="firstActiveBtn" href="#" @click="setTemplate($event, 'TemplatesNbaEvents')">
                <div class="big-sports"></div>
                <div>NBA Scoreboard</div>
            </a>
            <a class="flex-col selector-btn" href="#" @click="setTemplate($event, 'TemplatesFlightsTracker')">
                <div>
                    <svg width="35" height="38" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="#203C71"/>
                    </svg>
                </div>
                <div>Flights Tracker</div>
            </a>        
        </div>
    </div>
</template>
<script>
import Config from '../../../api/config/config'

export default {
    data() {
        return {
            currentBtn: null
        }
    },
    methods: {
        setTemplate(evt, template) {            
            this.toggleBtns(evt.currentTarget)
            const previousConfig = {
                configOb: this.$store.state.app.config,
                useLiveData: this.$store.state.app.useLiveData
            }
            
            this.$store.commit('app/setTemplate', template)
            this.setAppConfig(template)
            this.$emit(`templatechanged`, previousConfig)
        },
        toggleBtns(newBtn) {
            this.currentBtn? this.currentBtn.classList.remove('active') : null
            this.currentBtn = newBtn
            this.currentBtn.classList.add('active')
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
        this.currentBtn = this.$refs.firstActiveBtn        
    }
}
</script>
<style scoped>
    .bar {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .bar-title {
        font-size: 1.3rem;
        margin-bottom: 0px;
    }

    .selector-btn, .selector-btn.active {
        margin: 10px;
        padding: 25px;
        border: 1px solid lightgrey;
        border-radius: 9px;
        color: grey !important;
        font-weight: 700 !important;      
        box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;  
    }

    .selector-btn.active {
        background-color:#edf6fb;
        color: #1C376C !important;
    }

    .selector-btn:hover {
        background-color:lightgrey;
        box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    }

    div.big-sports {
        background-image: url('~assets/images/sports-icon.png');
        background-repeat: no-repeat;
        background-position:center;
        width: 35px;
        height: 38px;    
        margin: 2px;
    }
</style>