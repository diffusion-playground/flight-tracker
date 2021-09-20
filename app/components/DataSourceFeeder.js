const poll = async ({ fn, validate, interval }) => {
    console.log('Start poll...');
    let fileNumber = 2;

    const executePoll = async (resolve, reject) => {        
        const result = await fn(fileNumber);
        fileNumber++;

        if (validate(result)) {
            return resolve(result);
        }

        setTimeout(executePoll, interval, resolve, reject);        
    };

    return new Promise(executePoll);
};

export default class DataSourceFeeder {
    static startPolling = async (pollingInterval, $store) => {
        this.store = $store
        const polling = true
        console.log('Start polling...');        
        while (polling) {
            const pollApi = await poll({
                fn: this.updateDatasource,
                validate: () => { return polling ? false : true; },
                interval: pollingInterval
            })
        }
    }

    static updateDatasource = () => {        
        this.store.commit('flights/set', this.store.state.diffusion.subscribedFlights)
    }
}