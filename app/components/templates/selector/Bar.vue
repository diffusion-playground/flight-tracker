<template>
    <div class="bar">
        <p class="bar-title">Select the data type you want to use:</p>
        <div class="navbar">                
            <a class="flex-row selector-btn active" ref="firstActiveBtn" href="#" @click="setTemplate($event, 'TemplatesNbaEvents')">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                        <g><rect fill="none" height="24" width="24"/></g><g><g>
                            <path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M5.23,7.75 C6.1,8.62,6.7,9.74,6.91,11H4.07C4.22,9.82,4.63,8.72,5.23,7.75z M4.07,13h2.84c-0.21,1.26-0.81,2.38-1.68,3.25 C4.63,15.28,4.22,14.18,4.07,13z M11,19.93c-1.73-0.22-3.29-1-4.49-2.14c1.3-1.24,2.19-2.91,2.42-4.79H11V19.93z M11,11H8.93 C8.69,9.12,7.81,7.44,6.5,6.2C7.71,5.06,9.27,4.29,11,4.07V11z M19.93,11h-2.84c0.21-1.26,0.81-2.38,1.68-3.25 C19.37,8.72,19.78,9.82,19.93,11z M13,4.07c1.73,0.22,3.29,0.99,4.5,2.13c-1.31,1.24-2.19,2.92-2.43,4.8H13V4.07z M13,19.93V13 h2.07c0.24,1.88,1.12,3.55,2.42,4.79C16.29,18.93,14.73,19.71,13,19.93z M18.77,16.25c-0.87-0.86-1.46-1.99-1.68-3.25h2.84 C19.78,14.18,19.37,15.28,18.77,16.25z" fill="#203C71"/>
                        </g></g>
                    </svg>
                </div>
                <div>NBA Scoreboard</div>
            </a>
            <a class="flex-row selector-btn" href="#" @click="setTemplate($event, 'TemplatesFlightsTracker')">
                <div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="#203C71"/>
                    </svg>
                </div>
                <div>Flights Tracker</div>
            </a> 
            <a class="flex-row selector-btn" href="#" @click="setTemplate($event, 'TemplatesFxdataCurrencyPairs')">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                        <path d="M0 0h24v24H0V0z" fill="none"/>
                        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" fill="#203C71"/>
                    </svg>
                </div>
                <div>Foreign Exchange</div>
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
            document.getElementById('templateMoreData').innerHTML = ''
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
                this.$store.state.app.template === 'TemplatesNbaEvents'? this.$NBAConfig 
                : this.$store.state.app.template === 'TemplatesFlightsTracker'? this.$flightTrackerConfig : this.$fxDataConfig
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
        padding: 5px 25px;
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
        background-size: cover;
        width: 24px;
        height: 24px;    
        margin: 2px;
    }
</style>