export const state = () => ({
    flightStates: [],
    incomingDataSourceData: 0,
    allAirlinesDataSavingPercentage: 22,
    byAirlineDataSavingPercentage: 1,    
    incomingDiffusionDataAll: 0,
    incomingDiffusionDataByAirline: 0,
    showAll: true
  })
  
  export const mutations = {
    set (state, flights) {
      state.flightStates = flights
      state.incomingDataSourceData += JSON.stringify(state.flightStates).length      
      state.incomingDiffusionDataAll = (state.allAirlinesDataSavingPercentage * state.incomingDataSourceData) / 100
      state.incomingDiffusionDataByAirline = (state.byAirlineDataSavingPercentage * state.incomingDataSourceData) / 100
    },
    setShowAll (state, value) {
      state.showAll = value
    }
  }