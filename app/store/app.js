export const state = () => ({
    config: null,
    template: 'TemplatesNbaEvents'
})

export const mutations = {
    setConfig(state, config) {        
        state.config = config
    },
    setTemplate(state, template) {
        state.template = template
    }
}