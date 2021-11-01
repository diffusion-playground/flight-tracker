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