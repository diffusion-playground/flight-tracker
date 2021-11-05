export const state = () => ({
    subscribedFlights: [],
    connected: false,
    lastTopicReceived: '',
    lastMessage: {},
    topicsTree: [],
    diffusionEnabled: true,
})

export const mutations = {
    set (state, remoteFlight) {
      state.lastMessage = remoteFlight
      const flightIdx = state.subscribedFlights.findIndex(flight => flight[0] === remoteFlight[0])
      if (flightIdx !== -1) {
        this._vm.$set(state.subscribedFlights, flightIdx, remoteFlight)
      } else {
        state.subscribedFlights.push(remoteFlight)
      }
    },
    setTopic (state, topic) {
      state.lastTopicReceived = topic
    },
    setConnected(state, status) {
      state.connected = status
    },
    setTopicsTree(state, topicsTree) {
      state.topicsTree = topicsTree
    },
    setDiffusionEnabled(state, value) {
      state.diffusionEnabled = value
    }
  }

  export const actions = {
    getTopicValue({state}, flightId) {            
      return state.subscribedFlights ? state.subscribedFlights.find(flight => flight[1].trim() == flightId) : {}
    },
    getTreeTopicValue({state}) {
      return state.topicsTree
    }
  }