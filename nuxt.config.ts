// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'AI Compass — AI 资讯与产品导航',
      meta: [
        { name: 'description', content: '每日 AI 资讯、AI 产品导航，快速跳转官方站点。' },
        { name: 'theme-color', content: '#06b6d4', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#0f172a', media: '(prefers-color-scheme: dark)' }
      ]
    }
  },
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  },
  ui: {
    // 禁用自动字体拉取，规避 Google Fonts 网络警告
    fonts: false
  }
})
