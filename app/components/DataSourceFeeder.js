const poll = async ({ fn, validate, interval }) => {
    console.log('Start poll...');    

    const executePoll = async (resolve, reject) => {             
        const result = await fn();                

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
        const config = this.store.state.app.config
        this.store.commit(config.getSourceDataStoreFn(), config.getSourceData(this.store))
        return
    }
}