import NBAConfig from '~/api/config/nba.js'
import FlightTrackerConfig from '~/api/config/flight-tracker.js'

export default (ctx, inject) => {  
    inject('NBAConfig', NBAConfig(ctx.$store))
    inject('flightTrackerConfig', FlightTrackerConfig(ctx.$store))
}