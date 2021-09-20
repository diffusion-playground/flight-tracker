<template>
    <div class="flight-poller">
        <h2>Source data</h2>
        <textarea v-model="flights"></textarea>
    </div>
</template>
<script>
export default ({       
    data() {
        return {            
        }
    },
    computed: {
        flights() {
            return JSON.stringify(this.$store.state.flights.flightStates);
        }
    }
})
</script>
