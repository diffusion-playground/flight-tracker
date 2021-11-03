export const state = () => ({
    events: [],
    savingsPercentage: 78,
    restSavingsPercentage: 22,
    restFilteredSavingsPercentage: 1,
    eventStates: [],
    incomingDataSourceData: 0,
    incomingDiffusionDataAll: 0,
    incomingDiffusionDataFiltered: 0,
    showAll: true
})

export const mutations = {
    setEvent (state, remoteEvent) {      
      const eventIdx = state.events.findIndex(event => event.id === remoteEvent.id)
      if (eventIdx !== -1) {
        this._vm.$set(state.events, eventIdx, remoteEvent)
      } else {
        state.events.push(remoteEvent)
      }
    },
    
    setSavingsPercentage(state, value) {
      state.savingsPercentage = value
    },
    
    setShowAll (state, value) {
      state.showAll = value
    },
    
    set (state, events) {
      state.eventsStates = events
      state.incomingDataSourceData += JSON.stringify(state.eventsStates).length
      state.incomingDiffusionDataAll = (state.restSavingsPercentage * state.incomingDataSourceData) / 100
      state.incomingDiffusionDataFiltered = (state.restFilteredSavingsPercentage * state.incomingDataSourceData) / 100
    },
}

export const actions = {
  getTopicValue({state}, eventId) {     
    console.log(state.events);
    return state.events ? state.events.find(event => event.id == eventId) : {}
  },
  getTreeTopicValue({state}) {
    return state.topicsTree
  }
}