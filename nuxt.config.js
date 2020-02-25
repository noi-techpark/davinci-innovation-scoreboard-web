export default {
  mode: 'spa',
  env: {
    api: process.env.API || 'http://localhost:8081/v1/'
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
    baseURL: process.env.API || 'http://localhost:8081/v1/',
    credentials: true
  },
  router: {
    middleware: ['auth']
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/admin',
      callback: '/callback'
    },
    strategies: {
      noi: {
        _scheme: 'oauth2',
        authorization_endpoint: process.env.KEYCLOAK_AUTHORIZATION_URI || 'http://localhost:8080/auth/realms/NOI/protocol/openid-connect/auth',
        userinfo_endpoint: process.env.KEYCLOAK_USERINFO_URI || 'http://localhost:8080/auth/realms/NOI/protocol/openid-connect/userinfo',
        scope: ['profile', 'email'],
        response_type: 'token',
        token_key: 'access_token',
        token_type: 'Bearer',
        redirect_uri: process.env.KEYCLOAK_CALLBACK || 'http://localhost:3000/callback',
        client_id: process.env.KEYCLOAK_CLIENT_ID || 'davinci-innovation-scoreboard-web'
      }
    },
    resetOnError: true
  },
  purgeCSS: {
    whitelist: [
      'text-metric0-500',
      'text-metric1-500',
      'text-metric2-500',
      'text-metric3-500',
      'text-metric4-500',
      'text-metric5-500',
      'hover:text-metric0-500',
      'hover:text-metric1-500',
      'hover:text-metric2-500',
      'hover:text-metric3-500',
      'hover:text-metric4-500',
      'hover:text-metric5-500',
      'bg-metric0-500',
      'bg-metric1-500',
      'bg-metric2-500',
      'bg-metric3-500',
      'bg-metric4-500',
      'bg-metric5-500',
      'border-metric0-500',
      'border-metric1-500',
      'border-metric2-500',
      'border-metric3-500',
      'border-metric4-500',
      'border-metric5-500',
      'hover:border-metric0-500',
      'hover:border-metric1-500',
      'hover:border-metric2-500',
      'hover:border-metric3-500',
      'hover:border-metric4-500',
      'hover:border-metric5-500',
    ],
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
