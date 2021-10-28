export const state = () => ({
    events: [],
    savingsPercentage: 78
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