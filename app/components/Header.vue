<template>
    <div class="col main-col w-100 no-border">
        <div class="diffusion-logo">
            <img src="~/assets/images/diffusion-logo.png" height="38px"/>
            &nbsp;<h1>Playground</h1>        
        </div>        

        <p>A sample web application to <b>consume</b>, <b>enrich</b> and <b>deliver</b> real-time events using Diffusion </p>

        <TemplatesSelectorBar v-on:templatechanged="onTemplateChanged" />   

        <h3 class="app-title">{{appTitle}}</h3>
        
    </div>
</template>
<script>
export default ({
    computed: {
        appTitle() {
            return this.$store.state.app.config ? this.$store.state.app.config.getTitle() : ''
        } 
    },
    methods: {
        onTemplateChanged(oldConfig) {          
            this.$diffusionService.setConfig(this.$store.state.app.config)
            this.$diffusionService.switchSubscriptions(oldConfig, {
                    configOb: this.$store.state.app.config,
                    useLiveData: this.$store.state.app.useLiveData
                }
            )
        }
    }
})
</script>
<style scoped>
.app-title {
    margin-top: 2.5rem;
    color: #1C376C;
    font-size: 28px;
}
</style>