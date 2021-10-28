export default $store => ({
    init() {                
        this.pageAssets = {
            title: 'Flight Tracker Application',
            consume: {
                iconClass: 'plane',
                text: 'Flight Tracking'
            },
            deliver: {
                iconClass: 'mobile-friendly',
                text: 'Flight Tracker'
            }
        }
    },

    getTitle() {
        return this.pageAssets.title
    },

    getConsumeAssets() {        
        return this.pageAssets.consume || {}
    },

    getDeliverAssets() {        
        return this.pageAssets.deliver || {}
    },

    getSavingsPercentage() {
        if (this.store.state.flights.showAll) {
            return 100 - this.store.state.flights.allAirlinesDataSavingPercentage
        }
        return 100 - this.store.state.flights.byAirlineDataSavingPercentage        
    }
})