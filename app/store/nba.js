export const state = () => ({
    events: [],
    savingsPercentage: 3,
    restSavingsPercentage: 22,
    restFilteredSavingsPercentage: 1,
    eventStates: [],
    incomingDataSourceData: 0,
    incomingDiffusionDataAll: 0,
    incomingDiffusionDataFiltered: 0,
    showAll: true,
    messagesSentCount: 0,
    messagesReceivedCount: 0,
    receivedDataSize: 32
})

export const mutations = {
    setEvent (state, remoteEvent) {            
      /*state.receivedDataSize = JSON.stringify(remoteEvent).length            */
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
      state.messagesSentCount += 1
      state.messagesReceivedCount += 1
      state.eventsStates = events      
      state.incomingDataSourceData += JSON.stringify(state.eventsStates).length
      state.incomingDiffusionDataAll = ((state.savingsPercentage) * state.incomingDataSourceData) / 100
      state.incomingDiffusionDataFiltered = ((state.savingsPercentage) * state.incomingDataSourceData) / 100
    },
    clearEvents(state, events = []) {
      state.events = []
      state.eventStates = []
    }
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