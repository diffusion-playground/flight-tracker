const poll = async ({ fn, validate, interval, maxAttempts }) => {
    console.log('Start poll...');
    let fileNumber = 2;

    const executePoll = async (resolve, reject) => {        
        const result = await fn(fileNumber);
        fileNumber++;

        if (validate(result)) {
            return resolve(result);
        }
        if (maxAttempts && fileNumber > maxAttempts) {
            fileNumber = 1
        }
        setTimeout(executePoll, interval, resolve, reject);        
    };

    return new Promise(executePoll);
};

const callEndpoint = async (jsonFileNumber) => {

    const flights = await content(`${contentType}${jsonFileNumber}`)
                            .limit(30)
                            .fetch()
                            .catch(err => {
                                error({ statusCode: 404, message: "Content not found" });
                            });
    console.log('CallEndpoint: ', flights);
    if (flights) {
        store.commit(storeCommitFn, flights)   
    }
    if (callbackFn) {        
        callbackFn(flights.states)
    }
    return flights;
}

const stopPolling = () => {            
    return polling ? false : true;
}

const pollingInterval = 3000
const polling = true
let content = '';
let contentType = ''
let store = null
let storeCommitFn = ''
let callbackFn = null;

export default $content => ($contentType, $store, $storeCommitFn = 'flights/set', $name = 'Content') => ({    
    startPolling: async () => {
        console.log('Start polling...');                
        content = $content
        contentType = $contentType
        store = $store
        storeCommitFn = $storeCommitFn
        
        while (polling) {
            const pollApi = await poll({
                fn: callEndpoint,
                validate: stopPolling,
                interval: pollingInterval,
                maxAttempts: 30
            })
        }
    },
    setCallback: (callbackFnParam) => {
        callbackFn = callbackFnParam
    },
    loadFirstDataSet: async (jsonFileNumber = 1) => {
        const flights = await $content(`${$contentType}${jsonFileNumber}`)
                            .limit(30)
                            .fetch()
                            .catch(err => {
                                error({ statusCode: 404, message: "Content not found" });
                            });
        console.log('FirstCallEndpoint: ', flights);
        if (flights) {
            $store.commit($storeCommitFn, flights)   
            $store.commit('diffusion/set', flights.states)
        }
    }
})