<template>
    <div class="diffusion-enabled-toggle">        
        <div class="midsec-text">{{logoText}}</div>            
        <img class="midsec-diffusion-logo" src="~/assets/images/diffusion-logo.png" height="38px"/>
        <Toggle :value="toggleValue" class="enrich-toggle" v-on:toggleChanged="onToggle" />                    
        <img class="diffusion-enabled" src="~/assets/images/diffusion-enabled.png" v-if="toggleValue" />
        <img class="diffusion-disabled " src="~/assets/images/diffusion-disabled.png" v-if="!toggleValue"/>        
    </div>
</template>
<script>
export default {
    data() {
        return {
            toggleValue: false,
            logoText: 'Switch ON'
        }
    },
    methods: {
        onToggle(value) {
            this.toggleValue = value
            this.logoText = this.logoText === 'Switch ON'? 'Powered By' : 'Switch ON'
            this.$store.commit('diffusion/setDiffusionEnabled', value)
        }
    }
}
</script>
<style scoped>
.midsec-text {
    color: #1C376C;
    font-size: 1.3rem;
}
.diffusion-enabled-toggle {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
}

.midsec-diffusion-logo {
    margin: 10px 0;
}

.diffusion-enabled, .diffusion-disabled {
    max-width: 365px;
    margin-top: 16px;
}
</style>