import NBAConfig from '~/api/config/nba.js'
import FlightTrackerConfig from '~/api/config/flight-tracker.js'
import FxDataConfig from '~/api/config/fxdata'

export default (ctx, inject) => {  
    inject('NBAConfig', NBAConfig(ctx.$store))
    inject('flightTrackerConfig', FlightTrackerConfig(ctx.$store))
    inject('fxDataConfig', FxDataConfig(ctx.$store))
}