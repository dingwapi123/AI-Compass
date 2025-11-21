<script setup lang="ts">
import { sampleArticles, sampleProducts } from '../utils/sample-data'

const query = ref('')

const filteredArticles = computed(() =>
  sampleArticles.filter((item) => {
    const text = `${item.title} ${item.summary} ${item.tags.join(' ')}`.toLowerCase()
    return text.includes(query.value.trim().toLowerCase())
  })
)

const filteredProducts = computed(() =>
  sampleProducts.filter((item) => {
    const text = `${item.name} ${item.description} ${item.tags.join(' ')}`.toLowerCase()
    return text.includes(query.value.trim().toLowerCase())
  })
)
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-2">
      <h1 class="text-3xl font-semibold text-slate-900">搜索</h1>
      <p class="text-slate-600">同时搜索资讯与产品（示例数据）。</p>
    </div>

    <UInput
      v-model="query"
      placeholder="输入关键词，例如 “多模态” 或 “图像生成”"
      icon="i-heroicons-magnifying-glass"
      size="lg"
      class="w-full sm:w-96"
    />

    <div class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-newspaper" class="h-5 w-5 text-sky-500" />
          <h2 class="text-xl font-semibold text-slate-900">资讯</h2>
          <span class="text-sm text-slate-500">({{ filteredArticles.length }})</span>
        </div>
        <div class="space-y-3">
          <UCard
            v-for="item in filteredArticles"
            :key="item.id"
            class="hover:border-sky-200 transition border-slate-200"
          >
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2 text-xs text-slate-500">
                <span class="font-semibold text-slate-700">{{ item.source }}</span>
                <span class="h-1.5 w-1.5 rounded-full bg-slate-300" />
                <span>{{ new Date(item.publishedAt).toLocaleDateString() }}</span>
              </div>
              <NuxtLink :href="item.url" target="_blank" class="text-lg font-semibold text-slate-900 hover:text-sky-600">
                {{ item.title }}
              </NuxtLink>
              <p class="text-sm text-slate-600 line-clamp-2">{{ item.summary }}</p>
            </div>
          </UCard>
          <div v-if="!filteredArticles.length" class="text-sm text-slate-500">暂无匹配资讯。</div>
        </div>
      </div>

      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-cube-transparent" class="h-5 w-5 text-sky-500" />
          <h2 class="text-xl font-semibold text-slate-900">产品</h2>
          <span class="text-sm text-slate-500">({{ filteredProducts.length }})</span>
        </div>
        <div class="space-y-3">
          <UCard
            v-for="product in filteredProducts"
            :key="product.id"
            class="hover:border-sky-200 transition border-slate-200"
          >
            <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
              <UBadge color="primary" variant="soft">{{ product.category }}</UBadge>
              <span>{{ product.pricing }}</span>
            </div>
            <NuxtLink :href="product.url" target="_blank" class="text-lg font-semibold text-slate-900 hover:text-sky-600">
              {{ product.name }}
            </NuxtLink>
            <p class="text-sm text-slate-600 line-clamp-2">{{ product.description }}</p>
          </UCard>
          <div v-if="!filteredProducts.length" class="text-sm text-slate-500">暂无匹配产品。</div>
        </div>
      </div>
    </div>
  </div>
</template>
