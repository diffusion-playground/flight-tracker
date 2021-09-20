<template>
    <div>
        <img class="flow prem" src="~/assets/images/enrich-flow.png" v-if="toggleValue" />
        <img class="flow cloud" src="~/assets/images/cloud-logo.png" v-if="!toggleValue"/>
        <div class="d-centered-flex pt-0">
            <h5>Cloud</h5>
            <Toggle :value="toggleValue" class="enrich-toggle" v-on:toggleChanged="onToggle" />
            <h5>On-Prem</h5>
        </div>
    </div>    
</template>
<script>
export default {
    data() {
        return {
            toggleValue: false
        }
    },
    methods: {
        onToggle(value) {
            this.toggleValue = value
        }
    }
}
</script>

<style>
.pt-0 {
    padding-top: 0px;
}
h5 {
    margin-top: 5px !important;
}
.toggle-wrapper {
    margin: 5px 15px;
}
.cloud {
    margin-top: 100px !important;
}
.prem {
    margin-top: 105px !important;
}
</style>