export default $store => ({
    init() {            
        this.pageAssets = {
            title: 'NBA Scoreboard and Odds',            
            consume: {
                iconClass: 'sports',
                text: 'NBA Scoreboard',
                toolTip: 'site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard',
            },
            deliver: {
                iconClass: 'mobile-friendly',
                text: 'NBA Scoreboard'
            },
            subscriptions: [
                {
                    topicPath: '?ESPN/nba-scoreboard/events/.*',
                    storeSetFnString: 'nba/setEvent'
                }
            ],
            topicsTree: {
                topicPath: '?rest/sports/nba/events//',
                storeSetFnString: 'flights/setTopicsTree'
            },
            sourceDataStoreFn: 'nba/set',
            dataUnitSize: 1050
        }
        
        console.log('NBA Config Initialized')
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
        return (100 - $store.state.nba.savingsPercentage).toFixed(0)
    },

    getSubscriptions() {
        return this.pageAssets.subscriptions
    },

    getMessageCommitStorages() {
        return this.pageAssets.subscriptions.map(subscription => subscription.storeSetFnString)
    },

    getTreeTopicPath() {
        return this.pageAssets.topicsTree.topicPath
    },
    
    getRawData($store) {        
        return $store.state.nba.events
    },

    getSourceData($store) {
        return $store.state.nba.events
    },

    getSourceDataStoreFn() {
        return this.pageAssets.sourceDataStoreFn
    },

    getIncommingData($store) {
        return $store.state.nba.incomingDataSourceData
    },

    getIncommingDataAll($store) {
        return $store.state.nba.incomingDiffusionDataAll
    },

    getIncommingDataFiltered($store) {
        return $store.state.nba.incomingDiffusionDataFiltered
    },

    getShowAll($store) {
        return $store.state.nba.showAll
    },

    getDataUnitSize() {
        return this.pageAssets.dataUnitSize
    },

    getMessagesSentCount($store) {
        return $store.state.nba.messagesSentCount
    },

    getMessagesReceivedCount($store) {
        return $store.state.nba.messagesReceivedCount
    },

    getReceivedDataSize($store) {
        return $store.state.nba.receivedDataSize
    }

})