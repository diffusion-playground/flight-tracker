export const state = () => ({
    subscribedFlights: [],
    connected: false,
    topicsTree: []
})

export const mutations = {
    set (state, remoteFlight) {
      const flightIdx = state.subscribedFlights.findIndex(flight => flight[0] === remoteFlight[0])
      if (flightIdx !== -1) {
        this._vm.$set(state.subscribedFlights, flightIdx, remoteFlight)
      } else {
        state.subscribedFlights.push(remoteFlight)
      }
    },
    setConnected(state, status) {
      state.connected = status
    },
    setTopicsTree(state, topicsTree) {
      state.topicsTree = topicsTree
    }
  }