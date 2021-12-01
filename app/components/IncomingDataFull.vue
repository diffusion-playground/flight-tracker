<template>
    <div :class="elClass + ' incoming-full-data'">        
        <img src="~/assets/images/gauge_red.png" v-if="elClass === 'incoming-red'"/>
        <img src="~/assets/images/gauge_green.png" v-if="elClass === 'incoming-green'"/>        
        <div>
            <div class="data-list">                
                <div>Last message size: {{lastMessageSize}} KB</div>
                <div>Total data {{sentReceivedText}}: {{value}} bytes</div>
                <div v-if="elClass === 'incoming-green'">Data Savings: {{dataSavingsPercentage}}%</div>
            </div>
        </div>
        <div class="published" v-if="elClass === 'incoming-reda'">            
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="48px" viewBox="0 0 24 24" width="48px" fill="#000000"><g><rect fill="none" height="24" width="24"/><path d="M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20 M12,22c5.52,0,10-4.48,10-10c0-5.52-4.48-10-10-10 C6.48,2,2,6.48,2,12C2,17.52,6.48,22,12,22L12,22z M11,12l0,4h2l0-4h3l-4-4l-4,4H11z"/></g></svg>
        </div>
        <div class="received" v-if="elClass === 'incoming-greena'">            
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="48px" viewBox="0 0 24 24" width="48px" fill="#000000"><g><rect fill="none" height="24" width="24"/><path d="M12,4c4.41,0,8,3.59,8,8s-3.59,8-8,8s-8-3.59-8-8S7.59,4,12,4 M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10 c5.52,0,10-4.48,10-10C22,6.48,17.52,2,12,2L12,2z M13,12l0-4h-2l0,4H8l4,4l4-4H13z"/></g></svg>    
        </div>
    </div>
</template>
<script>
export default ({
    props: ['value', 'elClass', 'showLegend'],    
    computed: {    
        dataSavingsPercentage() {            
            return this.$store.state.app.config ? this.$store.state.app.config.getSavingsPercentage(this.$store) : 0
        },         
        lastMessageSize() {
            return this.elClass === 'incoming-red' ? 
                this.$store.state.app.config ? this.$store.state.app.config.getDataUnitSize() : 0
                : this.$store.state.app.config ? this.$store.state.app.config.getReceivedDataSize(this.$store) : 0
        },
        getMessagesCount() {
            return this.elClass === 'incoming-red' ?
                this.$store.state.app.config ? this.$store.state.app.config.getMessagesSentCount(this.$store) : 0
                : this.$store.state.app.config ? this.$store.state.app.config.getMessagesReceivedCount(this.$store) : 0
        },
        sentReceivedText() {
            return this.elClass === 'incoming-red' ? 'Sent' : 'Received'
        }        
    },
})
</script>
<style scoped>
.incoming-full-data {
    display: flex;
    width: 90%;
    height: 125px;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    border-top: 1px solid lightblue;
    border-bottom: 1px solid lightblue;
    margin: 10px 0 20px;
}
.incoming-full-data > img { 
    height: 40px;
}

.data-list {
    margin: 10px;
}

.data-list div {
    font-size: 0.9rem;
}

.published, .received {                
    margin: 15px;
}

.published > svg {
    fill: red;
}

.received > svg {
    fill: green;
}

</style>