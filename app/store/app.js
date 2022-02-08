export const state = () => ({
    config: null,
    template: 'TemplatesNbaEvents',
    useLiveData: false
})

export const mutations = {
    setConfig(state, config) {        
        state.config = config
    },
    setTemplate(state, template) {
        state.template = template
        console.log(state.template)
    },
    setLiveData(state, value) {
        state.useLiveData = value
    }
}