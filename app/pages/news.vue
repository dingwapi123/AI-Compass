<script setup lang="ts">
import { sampleArticles } from "../utils/sample-data"

const search = ref("")
const selectedSource = ref("全部")
const selectedTag = ref("全部")

const sources = computed(() => [
  "全部",
  ...new Set(sampleArticles.map((a) => a.source)),
])
const tags = computed(() => [
  "全部",
  ...new Set(sampleArticles.flatMap((a) => a.tags)),
])

const filteredArticles = computed(() =>
  [...sampleArticles]
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )
    .filter((item) => {
      const matchSource =
        selectedSource.value === "全部" || item.source === selectedSource.value
      const matchTag =
        selectedTag.value === "全部" || item.tags.includes(selectedTag.value)
      const text = `${item.title} ${item.summary}`.toLowerCase()
      const matchSearch = text.includes(search.value.trim().toLowerCase())
      return matchSource && matchTag && matchSearch
    })
)
</script>

<template>
  <div class="space-y-8 text-slate-900 dark:text-slate-50 transition-colors">
    <div class="space-y-2">
      <h1 class="text-3xl font-semibold text-slate-900 dark:text-white">
        AI 资讯
      </h1>
      <p class="text-slate-600 dark:text-slate-300">
        按来源/标签筛选，点击卡片直达原文。
      </p>
    </div>

    <div class="flex flex-wrap gap-3 items-center">
      <UInput
        v-model="search"
        placeholder="搜索标题或摘要"
        icon="i-heroicons-magnifying-glass"
        class="w-full sm:w-80"
      />
      <USelect
        v-model="selectedSource"
        :options="sources"
        icon="i-heroicons-building-library"
        color="primary"
      />
      <USelect
        v-model="selectedTag"
        :options="tags"
        icon="i-heroicons-tag"
        color="info"
      />
    </div>

    <div class="grid gap-4">
      <UCard
        v-for="item in filteredArticles"
        :key="item.id"
        class="hover:border-sky-200 transition border-slate-200 dark:border-slate-800 dark:bg-slate-900/70"
      >
        <div class="flex flex-col gap-2">
          <div
            class="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wide dark:text-slate-400"
          >
            <span class="font-semibold text-sky-600 dark:text-sky-300">{{
              item.source
            }}</span>
            <span
              class="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600"
            />
            <span>{{ new Date(item.publishedAt).toLocaleString() }}</span>
          </div>
          <NuxtLink
            :href="item.url"
            target="_blank"
            class="text-xl font-semibold text-slate-900 hover:text-sky-600 dark:text-slate-50 dark:hover:text-cyan-200"
          >
            {{ item.title }}
          </NuxtLink>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {{ item.summary }}
          </p>
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="tag in item.tags"
              :key="tag"
              color="primary"
              variant="soft"
            >
              {{ tag }}
            </UBadge>
            <UBadge
              v-if="item.featured"
              color="primary"
              variant="soft"
              icon="i-heroicons-sparkles"
            >
              精选
            </UBadge>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
