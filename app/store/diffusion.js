export const state = () => ({
    subscribedFlights: []
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
  }