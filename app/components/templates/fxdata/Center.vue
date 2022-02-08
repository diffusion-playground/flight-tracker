<template>
<span class="fe-container">
    <h1>Foreign Exchange</h1>
    <div v-if="displayPair">                
        <TemplatesFxdataTierTableHeader :pairName="displayPair.pairName"/>
        <div class="table" v-for="tier in displayPair.tiers" :key="tier.idx">
            <TemplatesFxdataTierRow :pairName="displayPair.pairName" :tier="tier" />
        </div>                
        <TemplatesFxdataChart :chartData="chartData" :options="chartOptions" class="data-chart" />
    </div>
    <div v-if="!displayPair">
        <h1>Click on a Currency Pair on the right Table, to see it's values here.</h1>
    </div>
</span>
</template>
<script>
export default({    
    data() {
        return {
            chartOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Foreign Exchange'
                    }
                }
            }
        }
    },
    computed: {
        displayPair() {            
            return this.$store.state.fxdata.currentPair || null
        },
        chartData() {            
            const currentPairName = this.$store.state.fxdata.currentPairName            
            const currentTier = this.$store.state.fxdata.currentTier - 1
            const pairNode = this.$store.state.fxdata.chartData.find(data => data.pairName === currentPairName)            
            const offerData = pairNode.data.map(pairData => pairData.tiers[currentTier].offer.big)
            const bidData =  pairNode.data.map(pairData => pairData.tiers[currentTier].bid.big)
            return {     
                    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    datasets: [
                        {
                            label: 'Offer',
                            borderColor: '#4bade9',                            
                            fill: false,
                            data: offerData
                        }, {
                            label: 'Bid',
                            borderColor: '#1C376C',                            
                            fill: false,
                            data: bidData
                        }
                    ]
            }
        }
    },
    methods: {
        moveChartToCenter() {
            console.log('Moving Chart to center')
            const el = document.getElementById('fxChart')
            console.log('EL: ', el)
            const newParent = document.getElementById('templateMoreData')
            el.parentNode.removeChild(el)
            newParent.innerHTML = '';
            newParent.appendChild(el)
        },
    },
    mounted() {
        console.log('FXdata CENTER mounted')
        this.moveChartToCenter()
    }
})
</script>
<style scoped>
.fe-container {
    display: flex;
    flex-direction: column;
}
h1 {
    align-self: center;
    font-size: 1.5rem;
    text-align: center;
}
.table {
    display: flex;
    justify-content: flex-start;
    align-content: center;
}
.table .col{
    flex-grow: 1;
    border: 1px solid #FFFFFF;
}

.table .col div {
    padding: 10px;    
    background-color: #EDF6FB;
    border: 1px solid #FFFFFF;
}

.table .col .header{
    background-color: #4bade9;
    color: #FFFFFF;
    font-weight: bold;
    text-align: center;
}

.left-align{
    text-align: left !important;    
}

.score, .status, .odds, .over-under {
    display: flex;
    justify-content: center;
    align-items: center;    
}

.status, .odds, .over-under {    
    height: 49%;
}

.highlighted {
    background-color: lightgreen !important;
}

.data-chart {
    margin-top: 20px;
}

</style>