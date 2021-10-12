# How Diffusion Works
This is where all services classes live. When it comes to interacting with Diffusion, there are two classes:

- diffusion-client.js: This class, contains functions to directly interact with diffusion SDK.
- diffusion-service.js: This class interacts with the diffusion-client, and add some plauground's specific business logic.
- flight-tracker-tree.js: Utility class to render the Topics Tree

## Connecting to Diffusion
1. The main [APP](../pages/index.vue) calls the connect function in the diffusion-service

```javascript
    /** Connect to DIFFUSION */    
    this.$diffusionService.connect(
        'integra.us.diffusion.cloud',
        'admin',
        'admin1234',
        this.$store.state.topics.rootTopic,
        /* on message from Diffusion */
        null,
        /* on connected to Diffusion */
        () => { 
          //this.startPollingFlights();               
          DataSourceFeeder.startPolling(3000, this.$store)
          this.$store.commit('diffusion/setConnected', true)
        }
    );
```
2. The [Diffusion Service](./diffusion-service.js) initializes the Diffusion Client and uses it to connect to the Diffusion Server
```javascript
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
```
3. [diffusion-client](.(diffusion-client.js)) uses the SDK to establish the connection to the Diffusion Server

```javascript
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
```
## Subscribing to a topic

1. Once the connection was succesfully established, the playground is subscribing to the topics to receive all updates of the topics tree, we can see this in [Diffusion Service](./diffusion-service.js):

```javascript
    /**
     * This is the callback, Diffusion client calls after connection
     */
    onConnectedToDiffusion() {
        console.log('connected to diffusion');
        
        //this.setTopicViews();
        
        this.isConnected = true;
        
        /* We subscribe to this path in order to get all flights updates */
        this.diffusionClient.subscribe({topicPath: '?REST/opensky-network.org/airlines//'})

        /* And we subscribe to this other topic, to get the original topics tree */
        this.diffusionClient.subscribe({topicPath: 'REST/opensky-network.org', onValueCallback: this.onSourceDataMessage.bind(this)})

        if (this.onConnectedCallback) {
            this.onConnectedCallback();
        }
    },
```

## Receiving messages

1. After subscribing to a topic, we begin "listening" to its updates this way. We use [Vuex](https://vuex.vuejs.org/) to keep the App state updated, in [Diffusion Service](./diffusion-service.js):

```javascript
    onDiffusionMessage(message, topic) {
        /* We use a topics store (vuex) to update the playground state. When a flight updated info is received */
        this.store.commit('diffusion/setTopic', topic.trim())       
        /* We use a messages store (vuex) to update the playground state. In this case when we receive the whole original topics tre */ 
        this.store.commit('diffusion/set', message)        
    },
``` 