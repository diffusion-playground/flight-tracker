export const state = () => ({
    pairs: [],
    currentPairName: '',
    currentPair: null,
    chartData: [],
    currentTier: 1
})

export const mutations = {
    setPair(state, newPair) {        
        if (!newPair.pairName) {
            return
        }
        const pairIdx = state.pairs.findIndex(pair => pair.pairName === newPair.pairName)
        if (state.pairs.length === 0) {
            state.currentPairName = newPair.pairName
        }
        if (pairIdx !== -1) {
            this._vm.$set(state.pairs, pairIdx, newPair)
        } else {
            state.pairs.push(newPair)
        }
        state.currentPair = state.pairs.find(pair => pair.pairName === state.currentPairName)        
        
        // Add new Pair to chart data
        let pairChartData = state.chartData.find(data => data.pairName === newPair.pairName)
        if (pairChartData) {
            pairChartData.data.length >= 10 ? pairChartData.data.shift() : null;
            pairChartData.data.push(newPair)
        } else {
            state.chartData.push({pairName: newPair.pairName, data: [newPair]})
        }        
    },
    setPairName(state, pairName) {        
        state.currentPairName = pairName
        state.currentPair = state.pairs.find(pair => pair.pairName === pairName)        
    },
    set(state, pair) {
        //console.log('FX set: ',pair);
    },
    setTopicsTree(state, topics) {
        //console.log('FX setTopicsTree: ', topics)
    },
    setTier(state, tier) {
        state.currentTier = tier
    }
}