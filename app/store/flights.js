export const state = () => ({
    flightStates: [],
    incomingDataSourceData: 0,
    allAirlinesDataSavingPercentage: 22,
    byAirlineDataSavingPercentage: 1,    
    incomingDiffusionDataAll: 0,
    incomingDiffusionDataByAirline: 0,
    showAll: true,
    subscribedFlights: [],
    topicsTree: [],
    messagesSentCount: 0,
    messagesReceivedCount: 0,
    receivedDataSizeAll: 32,
    receivedDataSizeFiltered: 32
  })
  
  export const mutations = {
    setFlight (state, remoteFlight) {
      state.messagesSentCount++      
      state.lastMessage = remoteFlight
      const flightIdx = state.subscribedFlights.findIndex(flight => flight[0] === remoteFlight[0])
      if (flightIdx !== -1) {
        this._vm.$set(state.subscribedFlights, flightIdx, remoteFlight)
      } else {
        state.subscribedFlights.push(remoteFlight)
      }      
    },
    set (state, flights) {
      state.flightStates = flights
      state.messagesReceivedCount += 1
      state.incomingDataSourceData += JSON.stringify(state.flightStates).length      
      state.incomingDiffusionDataAll = (state.allAirlinesDataSavingPercentage * state.incomingDataSourceData) / 100
      state.incomingDiffusionDataByAirline = (state.byAirlineDataSavingPercentage * state.incomingDataSourceData) / 100
      state.receivedDataSizeAll = (state.allAirlinesDataSavingPercentage * 35) / 100
      state.receivedDataSizeFiltered = (state.byAirlineDataSavingPercentage * 35) / 100
    },
    setShowAll (state, value) {
      state.showAll = value
    },
    setTopicsTree(state, topicsTree) {
      state.topicsTree = topicsTree
    }
  }