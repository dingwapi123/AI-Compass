// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  app: {
    head: {
      title: 'AI Compass — AI 资讯与产品导航',
      meta: [
        { name: 'description', content: '每日 AI 资讯、AI 产品导航，快速跳转官方站点。' },
        { name: 'theme-color', content: '#0ea5e9' }
      ]
    }
  },
  ui: {
    fonts: {
      // 避免远程拉取 Google Fonts，改在本地/自行托管
      provider: 'none'
    }
  }
})
