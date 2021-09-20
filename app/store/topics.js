export const state = () => ({
    rootTopic: 'REST/opensky-network.org',
    topicViews: [
        {
            name: 'OpenSky 1',
            specification: 'map ?{{topic}}/.*// to <path(0)>/<expand()>'
        },
        {
            name: 'OpenSky 2',
            specification: 'map ?{{topic}}/.*// to <path(0)>/<expand()>/<expand()>'
        },
        {
            name: 'OpenSky 3',
            specification: 'map ?{{topic}}/.*// to <path(0)>/<expand()>/<expand()>/<expand()>'
        },
        {
            name: 'OpenSky 4',
            specification: 'map ?{{topic}}/.*// to <path(0)>/<expand()>/<expand()>/<expand()>/<expand()>'
        },
        {
            name: 'OpenSky 5',
            specification: 'map ?{{topic}}/.*// to <path(0)>/<expand()>/<expand()>/<expand()>/<expand()>/<expand()>'
        }
    ]
})