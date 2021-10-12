export default {
  target: 'static',
  router: {
    base: '/wp-content/themes/pushtech2021/demo/'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'diffusion-playground',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/fonts/roboto.css',
    '~/assets/main.css',
    'vue-json-pretty/lib/styles.css',    
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/diffusion-service',
    '~/plugins/vue-tooltip.js',
    {src: '~/plugins/vue2-leaflet-markercluster.js', mode:'client'},
    '@/plugins/vue-json-pretty',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [    
    '@nuxtjs/axios',
    'nuxt-leaflet',
    '@nuxt/content',
    '@nuxtjs/gtm',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},
  
  // Google Tag Manager
  gtm: {
    id: 'GTM-5PBMGLN'
  },

  publicRuntimeConfig: {
    gtm: {
      id: process.env.GOOGLE_TAG_MANAGER_ID
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vue-tooltip']
  },  
}
