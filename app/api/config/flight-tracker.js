export default $store => ({
    init() {                
        this.pageAssets = {
            title: 'Flight Tracker Application',            
            consume: {
                iconClass: 'plane',
                text: 'Flight Tracking',
                toolTip: 'opensky-network.org/api/states/all',
            },
            deliver: {
                iconClass: 'mobile-friendly',
                text: 'Flight Tracker'
            },
            subscriptions: [
                {
                    topicPath: '?RESTPUBLISHED/opensky-network.org/airlines//',
                    liveTopicPath: '?REST/opensky-network.org/airlines//',
                    storeSetFnString: 'flights/setFlight'
                }
            ],
            topicsTree: {
                topicPath: '?RESTPUBLISHED//',
                liveTopicPath: '?REST//',
                storeSetFnString: 'flights/setTopicsTree'
            },
            sourceDataStoreFn: 'flights/set',
            dataUnitSize: 35
        }
        console.log('Flights Tracker Config Initialized')
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

    getSavingsPercentage($store) {        
        if ($store.state.flights.showAll) {
            return 100 - $store.state.flights.allAirlinesDataSavingPercentage
        }
        return 100 - $store.state.flights.byAirlineDataSavingPercentage        
    },

    getSubscriptions() {
        return this.pageAssets.subscriptions
    },

    getMessageCommitStorages() {
        return this.pageAssets.subscriptions
    },

    getTreeTopicPath($store) {
        return $store.state.app.useLiveData ? this.pageAssets.topicsTree.liveTopicPath : this.pageAssets.topicsTree.topicPath
    },

    getRawData($store) {
        return $store.state.flights.subscribedFlights
    },

    getSourceData($store) {
        return $store.state.flights.subscribedFlights
    },

    getSourceDataStoreFn() {
        return this.pageAssets.sourceDataStoreFn
    },

    getIncommingData($store) {
        return $store.state.flights.incomingDataSourceData
    },

    getIncommingDataAll($store) {
        return $store.state.flights.incomingDiffusionDataAll
    },

    getIncommingDataFiltered($store) {
        return $store.state.flights.incomingDiffusionDataByAirline
    },

    getShowAll($store) {
        return $store.state.flights.showAll
    },

    getDataUnitSize() {
        return this.pageAssets.dataUnitSize
    },

    getMessagesSentCount($store) {
        return $store.state.flights.messagesSentCount
    },

    getMessagesReceivedCount($store) {
        return Math.round(0.66 * $store.state.flights.messagesReceivedCount)
    },

    getReceivedDataSize($store) {
        return $store.state.flights.showAll?
            $store.state.flights.receivedDataSizeAll : $store.state.flights.receivedDataSizeFiltered
    },

    resetTemplateData($store) {
        $store.commit('flights/clearFlights', [])
    }
})