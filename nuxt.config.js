export default {
  mode: 'spa',
  env: {
    api: process.env.API || 'http://localhost:8080/v1/'
  },
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
  css: [
    '~/css/main.css'
  ],
  plugins: [
    '~/plugins/axios',
    '~/plugins/filters',
    '~/plugins/portal',
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
    baseURL: process.env.API || 'http://localhost:8080/v1/'
  },
  router: {
    middleware: ['auth']
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
          user: false,
          logout: false

        }
      }
    },
    resetOnError: true
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
