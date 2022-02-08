export default $store => ({
    init() {            
        this.pageAssets = {
            title: 'Foreign Exchange',            
            consume: {
                iconClass: 'fxdata',
                text: 'Foreign Exchange',
                toolTip: 'site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard',
            },
            deliver: {
                iconClass: 'mobile-friendly',
                text: 'Foreign Exchange'
            },
            subscriptions: [
                {
                    topicPath: '?FXDATAPUBLISHED/pairs/.*',
                    liveTopicPath: '?FXDATAPUBLISHED/pairs/.*',
                    storeSetFnString: 'fxdata/setPair'
                }
            ],
            topicsTree: {
                topicPath: '?FXDATAPUBLISHED//',
                liveTopicPath: '?FXDATAPUBLISHED//',
                storeSetFnString: 'fxdata/setTopicsTree'
            },
            sourceDataStoreFn: 'fxdata/set',
            dataUnitSize: 105
        }
        
        console.log('Foreign Exchange Config Initialized')
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
        return [...this.pageAssets.subscriptions.map(subscription => subscription.storeSetFnString)]
    },

    getTreeTopicPath($store) {
        return $store.state.app.useLiveData ? this.pageAssets.topicsTree.liveTopicPath : this.pageAssets.topicsTree.topicPath
    },
    
    getRawData($store) {        
        return $store.state.fxdata.pairs
    },

    getSourceData($store) {
        return $store.state.fxdata.pairs
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
        return Math.round(0.66 * $store.state.nba.messagesReceivedCount)
    },

    getReceivedDataSize($store) {
        return $store.state.nba.receivedDataSize
    },

    resetTemplateData($store) {
        $store.commit('nba/clearEvents', [])
    }

})