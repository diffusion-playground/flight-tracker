export default $axios => ($apiUrl, $store, $storeCommitFn = 'flights/set', $name = 'Unnamed') => ({
    constructor() {
        this.callbackFn = null
    },
    async poll() {
        console.log(`Polling API ${$name}`);
        try {
            const flights = await $axios.$get(`${$apiUrl}`)
            if (flights) {
                $store.commit($storeCommitFn, flights)   
            }
            if (this.callbackFn) {
                this.callbackFn(flights.states)
            }
        } catch(e){ console.log(e)}
        
        setTimeout(this.poll(), 5000);
    },
    setCallback(callbackFn) {
        this.callbackFn = callbackFn
    }
})