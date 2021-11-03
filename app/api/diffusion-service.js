import Diffusion from "./diffusion-client";

export default $store => ({            
    diffusionClient() { return this.diffusionClient },

    /**
     * This is the event handler when the Connect to Diffusion button is clicked
     * @param {*} evt 
     */
    connect(
        host, user, password, rootTopic, onMessageCallback, onConnectedCallback
    ) {
        console.log('Connecting to Diffusion');        

        this.flightsPivot = []

        this.onConnectedCallback = onConnectedCallback

        // Instantiate Diffusion's Client
        // We send the connect and on message callbacks to handle those events
        this.diffusionClient = new Diffusion(
            this.onConnectedToDiffusion.bind(this), 
            onMessageCallback || this.onDiffusionMessage.bind(this)
        )

        // Set Diffusion config
        this.diffusionClient.setConfig({
            host: host,
            user: user,
            password: password,
            topic: rootTopic
        });

        // And connect to it
        this.diffusionClient.connect();
    },

    /**
     * This is the callback, Diffusion client calls after connection
     */
    onConnectedToDiffusion() {
        console.log('connected to diffusion');
        
        this.setTopicViews();
        
        this.isConnected = true;
        
        let diffusionClient = this.diffusionClient

        this.subscriptions = this.config.getSubscriptions();

        this.subscriptions.map( 
            subscription => diffusionClient.subscribe({topicPath: subscription.topicPath})
        )

        if (this.onConnectedCallback) {
            this.onConnectedCallback();
        }
    },

    switchSubscriptions(oldConfig, newConfig) {
        console.log('Switching Subscriptions')
        let diffusionClient = this.diffusionClient
        
        // Unsubscribe previous
        oldConfig.getSubscriptions().map(subscription => diffusionClient.unsubscribe(subscription.topicPath));
        
        // Subscribe new        
        newConfig.getSubscriptions().map( 
            subscription => diffusionClient.subscribe({topicPath: subscription.topicPath})
        )
    },

    replaceSubscription(topicPath, isLeaf, callbackFn) {
        if (this.currentTreeTopic) {
            this.diffusionClient.unsubscribe(this.currentTreeTopic)
            this.currentTreeTopic = null
        }
        if (!isLeaf) {
            return
        }
        this.diffusionClient.subscribe({topicPath: topicPath, onValeCallback: callbackFn})
        this.currentTreeTopic = topicPath
    },
        
    onDiffusionMessage(message, topic) {
        console.log('OnDiffusioMessage: ', topic, message, this.config.getMessageCommitStorages())
        this.config.getMessageCommitStorages().map(storageFn => {
            if (typeof storageFn === 'object' ) {
                console.log('Storing object: ', storageFn)
                this.store.commit(storageFn.storeSetFnString, message)
                return
            }
            console.log('Storing string: ', storageFn)
            this.store.commit(storageFn, message)
        })
    },

    async onSourceDataMessage(topic, specification, newValue, oldValue) {        
        const message = await newValue.get()       
        this.store.commit('diffusion/setTopicsTree', message)
    },

    /**
     * Publish to diffusion
     * @param {*} data 
     */
    publish(data) {
        this.diffusionClient.publishData(data);
    },

    setTopicViews() {        
        if (this.topicsStore.topicViews) {
            for (const topicView of this.topicsStore.topicViews) {
                this.diffusionClient.createTopicView(topicView.name, this.formatTopicViewExpression(topicView.specification));
            }
        }
    },
    
    formatTopicViewExpression(topicViewExpression) {
        const rootTopic = this.topicsStore.rootTopic.split('/')[0]; // ie: site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard
        return topicViewExpression.replace('{{topic}}', rootTopic); // ie: map ?{{topic}}/.*// to <path(0)>/<expand()>
    },

    setTopicsStore(topicsStore) {
        this.topicsStore = topicsStore
    },

    setFlightsStore(flightsStore) {
        this.flightsStore = flightsStore
    },

    setDiffusionStore(diffusionStore) {
        this.diffusionStore = diffusionStore
    },

    setStore(store) {
        this.store = store
    },

    setConfig(config) {
        this.config = config;
    },

    async fetchInitialValues(topic) {
        console.log('TOPIC: ', topic)
        const results = await this.diffusionClient.fetchInitialValues(topic)        
        return results;
    },

    async fetchTreeTopics(topic) {
        console.log('TREE TOPICS: ', topic)
        const results = await this.diffusionClient.fetchTopicWithNoValues(topic)        
        return results;
    },

    async fetchTopicValue(topic) {
        console.log('TOPIC VALUE: ', topic)
        const result = await this.diffusionClient.fetchTopicValue(topic)                
        return result;
    }
}) 