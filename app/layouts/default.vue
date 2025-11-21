<script setup lang="ts">
const links = [
  { label: '首页', to: '/' },
  { label: '资讯', to: '/news' },
  { label: '产品', to: '/products' },
  { label: '搜索', to: '/search' },
  { label: '提交', to: '/submit' }
]
</script>

<template>
  <UApp>
    <div class="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white text-slate-900">
      <header class="border-b border-slate-200/80 bg-white/80 backdrop-blur">
        <UContainer class="flex items-center justify-between py-4 gap-4">
          <NuxtLink to="/" class="flex items-center gap-2 font-semibold text-sky-600">
            <UIcon name="i-heroicons-sparkles" class="h-5 w-5" />
            <span>AI Compass</span>
          </NuxtLink>
          <nav class="flex items-center gap-3 text-sm font-medium text-slate-700">
            <NuxtLink
              v-for="link in links"
              :key="link.to"
              :to="link.to"
              class="px-2 py-1 rounded-md transition hover:text-sky-600 hover:bg-sky-100"
              active-class="text-sky-600 bg-sky-100"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>
          <UButton
            to="/submit"
            color="primary"
            variant="solid"
            icon="i-heroicons-paper-airplane"
            class="hidden sm:inline-flex"
          >
            提交线索
          </UButton>
        </UContainer>
      </header>

      <main class="py-10">
        <UContainer>
          <NuxtLoadingIndicator color="#0ea5e9" />
          <NuxtPage />
        </UContainer>
      </main>
      <footer class="border-t border-slate-200/80 bg-white/80 backdrop-blur">
        <UContainer class="py-6 text-sm text-slate-500 flex flex-col sm:flex-row justify-between gap-2">
          <span>AI Compass · 每日 AI 资讯与产品导航</span>
          <span class="flex items-center gap-1">
            <UIcon name="i-heroicons-rocket-launch" class="h-4 w-4 text-sky-500" />
            基于 Nuxt 4 + Nuxt UI 4
          </span>
        </UContainer>
      </footer>
    </div>
    <UNotifications />
  </UApp>
</template>
