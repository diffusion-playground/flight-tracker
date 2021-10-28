export const state = () => ({
    config: null,
    template: 'nba'
})

export const mutations = {
    setConfig(state, config) {        
        state.config = config
    }
}