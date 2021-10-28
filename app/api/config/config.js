import FlightTrackerConfig from "./flight-tracker.js"
import NbaConfig from "./nba.js"

export default class Config {
    static getConfig = (name) => {
        console.log('getting config');
        if (name === 'flight-tracker') {
            return new FlightTrackerConfig()
        }
        return new NbaConfig();
    }
}