export default $store => ({
    init() {            
        this.pageAssets = {
            title: 'NBA Scoreboard and Odds',
            consume: {
                iconClass: 'sports',
                text: 'NBA Scoreboard'
            },
            deliver: {
                iconClass: 'mobile-friendly',
                text: 'NBA Scoreboard'
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

    getSavingsPercentage(conditionFn, trueValue, falseValue) {        
        return conditionFn()? trueValue : falseValue
    }
})