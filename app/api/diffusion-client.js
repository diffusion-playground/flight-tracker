export default class Diffusion {
    constructor(onConnectedCallback, onReceiveMessageCallback ) {
        this.topic = 'default-topic';
        this.host = '127.0.0.1';
        this.user = 'admin';
        this.password = 'password';
        this.client = null;
        this.session = null;
        this.onConnectedCallback = onConnectedCallback || null;
        this.onReceiveMessageCallback = onReceiveMessageCallback || null;
    }

    /**
     * This method is used to configure Diffusion connection
     * @param host The host of the Diffusion Service
     * @param user The user to the Diffusion Service
     * @param password
     * @param topic The topic name to be created and consumer from
     */
    setConfig = ({ host, user, password, topic }) => {       
        console.log('Set Config Called')  
        this.host = host || '127.0.0.1';
        this.user = user || 'admin';
        this.password = password || 'password';
        this.topic = topic || 'default-topic';
        this.subscribedTopic = topic || 'default-topic';
    }

    /**
     * Method that handles connection to the Diffusion Service      
     */
    connect = async () => {
        /* Connect to Diffusion using the parameters previously set in setConfig method */
        let client = this;
        const session = await diffusion.connect({
            host: this.host,            
            principal: this.user,
            credentials: this.password,                       
            port: 443,
            secure: true
        }).then((session) => {
            client.session = session;
            /* Here's where we add the topic we are going to be using */
            console.log(`Adding Topic: `, client.topic);
            client.session.topics.add(client.topic, diffusion.topics.TopicType.JSON)
    
            console.log(`Connected: `, client.session.sessionId);
    
            /* If we setup a connected callback, let's call it */
            if (client.onConnectedCallback) {
                client.onConnectedCallback();
            }                
        });        
    }

    /* Method to set topic to publish to and consume from */
    setTopic = topic => { this.topic = topic; }

    /**
     * Method to subscribe to a topic and start consuming it
     * @param session We can pass an already existing session, otherwise it will use the internal one
     * @param topicPath Set a topic to subscribe to, if empty uses the internal one
     * @param onValueCallback callback to be called when a value is arrives in the topic. It can be null
     */
    subscribe = ({ session = undefined, topicPath = '', onValueCallback = null, addStream = true }) => {
        const currentSession = session || this.session;
        const currentTopic = topicPath || this.topic;
        console.log(`subscribing to: ${currentTopic}`);        
        if (addStream) {
            this.addStream(currentTopic, currentSession, onValueCallback);        
        }

        /* And subscribe to the topic */        
        currentSession.select(currentTopic);
    }

    addStream = (topicSelector, session = null, onValueCallback = null) => {
        const currentSession = session || this.session;
        /* We Setup the stream */
        currentSession.addStream(
            topicSelector,
            diffusion.datatypes.json()).on('value',
                onValueCallback || this.onReceiveMessage
            );
    }

    unsubscribe = (topicSelector, session = null) => {
        const currentSession = session || this.session;
        if (topicSelector) {
            currentSession.unsubscribe(currentSession, topicSelector);
            return;
        }
        console.log('Topic not specified: ' + topicSelector)
    }

    onReceiveMessage = (topic, specification, newValue, oldValue) => {
        let message = newValue.get();
        message.receiveTime = new Date();
        //console.log(`TOPIC - Receiving message for topic: ${topic}`, specification, newValue.get());
        if (this.onReceiveMessageCallback) {
            this.onReceiveMessageCallback(message, topic).bind(this);
        }
    }

    // Interface Functions
    publishData(data) {        
        if (this.session) {
            this.session.topicUpdate.set(this.topic, diffusion.datatypes.json(), data);
        }
    }

    closeConnection = () => {
        diffusion.close();
    }
    
    createTopicView = async (topicViewName, specification) => {
        if (this.session) {
            console.log('Creating TopicView: ', topicViewName, specification);
            await this.session.topicViews.createTopicView(topicViewName, specification);
        } else {
            console.log('Session not available when trying to create TopicView: ', topicViewName, specification);
        }
    }

    fetchInitialValues = (topic) => {
        return this.session.fetchRequest()            
            .withValues(diffusion.datatypes.json())
            .fetch(topic)
            .then(function(fetchResult) {
                const results = fetchResult.results();
                //console.log("Fetch Request returned "+results.length+" topics", results);
                return results
            });
    }
}