<template>
    <div class="flight-poller">
        <div class="poller-header">
            <h2>Source data <b v-if="!this.toggleValue">(Cached)</b></h2>
            <div class="toggle">
                <Toggle :value="toggleValue" class="enrich-toggle" v-on:toggleChanged="onToggle" />
                Live Data
            </div>
        </div>        
        <textarea class="poller-data" v-model="polledData"></textarea>
    </div>
</template>
<script>
export default ({       
    data() {
        return {       
            toggleValue: false     
        }
    },
    computed: {
        polledData() {
            //console.log('APP:', this.$store.state.app.config)
            return this.$store.state.app.config ? JSON.stringify(this.$store.state.app.config.getRawData(this.$store)) : ''
        }
    },
    methods: {
        onToggle(value) {
            this.toggleValue = value
            const previousConfig = {
                configOb: this.$store.state.app.config,
                useLiveData: this.$store.state.app.useLiveData
            }
            this.$store.commit('app/setLiveData', value)
            this.$store.state.app.config.resetTemplateData(this.$store)
            this.$diffusionService.switchSubscriptions(previousConfig, {
                    configOb: this.$store.state.app.config,
                    useLiveData: this.$store.state.app.useLiveData
                }
            )
        }
    },
})
</script>

<style scoped>
.poller-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
}

.toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}

.poller-data {
    font-family: 'Courier New', Courier, monospace;
}
</style>
