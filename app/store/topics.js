export const state = () => ({
    rootTopic: 'ESPN/nba-scoreboard',
    topicViews: [
        {
            name: 'SportsNBA 1',
            specification: 'map ?{{topic}}/.*// to <path(0)>/<expand()>'
        },
        {
            name: 'SportsNBA 2',
            specification: 'map ?{{topic}}/.*// to <path(0)>/<expand()>/<expand()>'
        },
        {
            name: 'SportsNBA 3',
            specification: 'map ?{{topic}}/.*// to <path(0)>/<expand()>/<expand()>/<expand()>'
        },
        {
            name: 'SportsNBA 4',
            specification: 'map ?{{topic}}/.*// to <path(0)>/<expand()>/<expand()>/<expand()>/<expand()>'
        },
        {
            name: 'SportsNBA 5',
            specification: 'map ?{{topic}}/.*// to <path(0)>/<expand()>/<expand()>/<expand()>/<expand()>/<expand()>'
        }
    ]
})