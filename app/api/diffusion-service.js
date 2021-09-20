import Diffusion from "./diffusion-client";

export default $store => ({    
    constructor() {
        this.diffusionClient = null
        this.chart = null
        this.topicsStore = $store.state.topics
        this.isConnected = false
        this.flightsStore = null
        this.diffusionStore = null
        this.onConnectedCallback = null
        this.$store = null        
    },
    
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
        
        //this.setTopicViews();
        
        this.isConnected = true;
        
        this.diffusionClient.subscribe({topicPath: '?REST/opensky-network.org/airlines//'})

        //this.diffusionClient.subscribe({topicPath: '?REST/opensky-network.org/', onValueCallback: this.onSourceDataMessage.bind(this)})

        if (this.onConnectedCallback) {
            this.onConnectedCallback();
        }
    },

    /*onSourceDataMessage(topic, specification, newValue, oldValue) {
        let message = newValue.get();
        console.log('OnSourceDataMessage: ', topic)        
        //this.store.commit('diffusion/set', message)
    },*/
        
    onDiffusionMessage(message, topic) {        
        //console.log('OnDiffusioMessage: ', topic)        
        this.store.commit('diffusion/set', message)
    },

    /**
     * Publish to diffusion
     * @param {*} data 
     */
    publish(data) {
        this.diffusionClient.publishData(data);
    },

    setTopicViews() {
        console.log('Setting TopicViews', this.topicsStore.topicViews);
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
    }
}) 