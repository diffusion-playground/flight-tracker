<template>
    <div class="flight-poller">
        <h2>Source data</h2>
        <textarea v-model="polledData"></textarea>
    </div>
</template>
<script>
export default ({       
    data() {
        return {            
        }
    },
    computed: {
        polledData() {
            console.log('APP:', this.$store.state.app.config)
            return this.$store.state.app.config ? JSON.stringify(this.$store.state.app.config.getRawData(this.$store)) : ''
        }
    }
})
</script>
