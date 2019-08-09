export default {
  mode: 'spa',
  head: {
    title: 'Innovation Scoreboard',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700&display=swap' }
    ]
  },
  loading: { color: '#fff' },
  css: [],
  plugins: [
    '~/plugins/filters'
  ],
  devModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  axios: {
    baseURL: 'http://localhost:8080/api/v1/'
  },
  router: {
    //middleware: ['auth']
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/admin'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: 'authenticate', method: 'post', propertyName: 'token' },
          user: { url: 'me', method: 'get' },
          logout: false

        }
      }
    }
  },
  build: {
    extend(config, ctx) {
        if (ctx.isDev && ctx.isClient) {
          config.module.rules.push({
            enforce: "pre",
            test: /\.(js|vue)$/,
            loader: "eslint-loader",
            exclude: /(node_modules)/,
            options: {
              fix: true
            }
          })
        }
      }
  }
}
