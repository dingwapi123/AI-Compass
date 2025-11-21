<script setup lang="ts">
const links = [
  { label: '首页', to: '/' },
  { label: '资讯', to: '/news' },
  { label: '产品', to: '/products' },
  { label: '搜索', to: '/search' },
  { label: '提交', to: '/submit' }
]

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const modeIcon = computed(() => (isDark.value ? 'i-heroicons-sun' : 'i-heroicons-moon'))
const modeLabel = computed(() => (isDark.value ? '切换为浅色模式' : '切换为深色模式'))

const toggleColorMode = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <UApp>
    <div
      class="page-shell min-h-screen text-slate-900 dark:text-slate-100 transition-colors"
    >
      <header class="border-b border-slate-200/80 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <UContainer class="flex items-center justify-between py-4 gap-4">
          <NuxtLink to="/" class="flex items-center gap-2 font-semibold text-sky-600 dark:text-sky-300">
            <UIcon name="i-heroicons-sparkles" class="h-5 w-5" />
            <span>AI Compass</span>
          </NuxtLink>
          <nav class="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
            <NuxtLink
              v-for="link in links"
              :key="link.to"
              :to="link.to"
              class="px-2 py-1 rounded-md transition hover:text-sky-600 hover:bg-sky-100 dark:hover:text-sky-300 dark:hover:bg-slate-800"
              active-class="text-sky-600 bg-sky-100 dark:text-sky-300 dark:bg-slate-800"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>
          <div class="flex items-center gap-2">
            <UButton
              :icon="modeIcon"
              :aria-label="modeLabel"
              color="gray"
              variant="ghost"
              size="md"
              square
              class="hover:bg-slate-100 dark:hover:bg-slate-800"
              @click="toggleColorMode"
            />
            <UButton
              to="/submit"
              color="primary"
              variant="solid"
              icon="i-heroicons-paper-airplane"
              class="hidden sm:inline-flex"
            >
              提交线索
            </UButton>
          </div>
        </UContainer>
      </header>

      <main class="py-10">
        <UContainer>
          <NuxtLoadingIndicator color="#06b6d4" />
          <NuxtPage />
        </UContainer>
      </main>
      <footer class="border-t border-slate-200/80 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <UContainer class="py-6 text-sm text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row justify-between gap-2">
          <span>AI Compass · 每日 AI 资讯与产品导航</span>
          <span class="flex items-center gap-1">
            <UIcon name="i-heroicons-rocket-launch" class="h-4 w-4 text-sky-500 dark:text-sky-300" />
            基于 Nuxt 4 + Nuxt UI 4
          </span>
        </UContainer>
      </footer>
    </div>
    <UNotifications />
  </UApp>
</template>
