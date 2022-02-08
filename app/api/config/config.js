import FlightTrackerConfig from "./flight-tracker.js"
import NbaConfig from "./nba.js"
import FxDataConfig from "./fxdata.js"

export default class Config {
    static getConfig = (name) => {
        console.log('getting config');
        if (name === 'flight-tracker') {
            return new FlightTrackerConfig()
        }
        if (name === 'fx-data') {
            return new FxDataConfig()
        }
        return new NbaConfig();
    }

    static setAppConfig($store, $config) {
        $store.commit(
            'app/setConfig',
            $config
        )
        $store.state.app.config.init($store)
    }
}