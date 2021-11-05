<template>
    <div :class="elClass + ' incoming-full-data'">        
        <img src="~/assets/images/gauge_red.png" v-if="elClass === 'incoming-red'"/>
        <img src="~/assets/images/gauge_green.png" v-if="elClass === 'incoming-green'"/>        
        <div>
            <div class="data-list">
                <div>Messages Sent: 30</div>
                <div>Last message size: 35,200 bytes</div>
                <div>Total data sent: 91,500 bytes</div>
                <div v-if="elClass === 'incoming-green'">Messages Sent: 30</div>
            </div>
        </div>
        <div class="published" v-if="elClass === 'incoming-red'">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z"/></svg>            
        </div>
        <div class="received" v-if="elClass === 'incoming-green'">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#ff0000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3zm-5.55-8h-2.9v3H8l4 4 4-4h-2.55z"/></svg>            
        </div>
    </div>
</template>
<script>
export default ({
    props: ['value', 'elClass', 'showLegend'],
    computed: {    
        dataSavingsPercentage() {            
            return this.$store.state.app.config ? this.$store.state.app.config.getSavingsPercentage(this.$store) : 0
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