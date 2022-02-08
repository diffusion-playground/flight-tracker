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
    receivedDataSize: 32,
    lastPlays: [],
    maxLastPlays: 100,
    selectedCompetitionId: null,
    selectedCompetition: null,
    espnLink: ''
})

export const mutations = {
    setEvent (state, remoteEvent) {                  
      const eventIdx = state.events.findIndex(event => event.id === remoteEvent.id)
      if (state.events.length === 0) {
        state.selectedCompetitionId = remoteEvent.id
      }
      if (eventIdx !== -1) {
        this._vm.$set(state.events, eventIdx, remoteEvent)
      } else {
        state.events.push(remoteEvent)
      }
    },

    setCompetitionId(state, competitionId) {
      state.selectedCompetitionId = competitionId
    },

    setLastPlay(state, event) {
      if (event.competitions && event.competitions[0].situation) {
        const competition = event.competitions[0]
        const competitors = event.competitions[0].competitors
        const lastPlay = competition.situation.lastPlay
        const lastPlayIdx = state.lastPlays.findIndex(play => play.id === lastPlay.id)        
        
        if (lastPlayIdx === -1) {
          const newLastPlay = {
            id: lastPlay.id,
            competitionId: competition.id,
            teamId: lastPlay.team.id,
            text: lastPlay.text,
            clock: competition.status.displayClock,
            quarter: competition.status.period,
            score: `${competitors[0].score} - ${competitors[1].score}`,
            teamLogo: competitors[0].id === lastPlay.team.id ? competitors[0].team.logo:competitors[1].team.logo,
            hasScored: (lastPlay.scoreValue > 0)
          }          
          state.lastPlays.unshift(newLastPlay)
           if (state.lastPlays.length > state.maxLastPlays) {            
             state.lastPlays.pop()
          }
        }
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
    return state.events ? state.events.find(event => event.id == eventId) : {}
  },
  getTreeTopicValue({state}) {
    return state.topicsTree
  },
  getCompetition({state}, competitionId) {
    return state.events.find(competition => competition.id === competitionId)
  }
}