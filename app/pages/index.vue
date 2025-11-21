<script setup lang="ts">
import { sampleArticles, sampleProducts } from '../utils/sample-data'

const featuredArticles = sampleArticles.filter((a) => a.featured).slice(0, 3)
const latestArticles = sampleArticles.slice(0, 3)
const featuredProducts = sampleProducts.filter((p) => p.featured).slice(0, 3)
</script>

<template>
  <div class="space-y-12">
    <section class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
      <div class="space-y-6">
        <UBadge color="primary" variant="solid" class="uppercase tracking-wide">
          每日 AI 资讯 · 产品导航
        </UBadge>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-slate-900">
          聚合最新 AI 动态，<br />
          一键直达产品官网
        </h1>
        <p class="text-lg text-slate-600 leading-relaxed">
          收录主流 AI 资讯源，分类导航热门产品（编码类、图像生成、视频生成），为你节省信息筛选和跳转时间。
        </p>
        <div class="flex flex-wrap gap-3">
          <UButton to="/news" size="lg" icon="i-heroicons-newspaper">
            查看最新资讯
          </UButton>
          <UButton to="/products" variant="ghost" size="lg" icon="i-heroicons-cube-transparent">
            浏览产品导航
          </UButton>
        </div>
        <div class="flex flex-wrap gap-3 text-sm text-slate-500">
          <span class="inline-flex items-center gap-1">
            <UIcon name="i-heroicons-bolt" class="h-4 w-4 text-sky-500" />
            实时筛选与搜索
          </span>
          <span class="inline-flex items-center gap-1">
            <UIcon name="i-heroicons-server" class="h-4 w-4 text-sky-500" />
            Supabase 数据层
          </span>
          <span class="inline-flex items-center gap-1">
            <UIcon name="i-heroicons-cloud" class="h-4 w-4 text-sky-500" />
            Vercel 部署
          </span>
        </div>
      </div>
      <div class="relative">
        <div class="absolute -inset-6 rounded-3xl bg-gradient-to-br from-sky-100 via-white to-transparent blur-2xl" />
        <div class="relative rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <div class="font-semibold text-slate-800">精选资讯</div>
            <NuxtLink to="/news" class="text-sm text-sky-600 hover:text-sky-700">更多</NuxtLink>
          </div>
          <div class="divide-y divide-slate-200">
            <div v-for="item in featuredArticles" :key="item.id" class="p-6">
              <div class="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wide">
                <span class="font-semibold text-sky-600">{{ item.source }}</span>
                <span class="h-1.5 w-1.5 rounded-full bg-slate-300" />
                <span>{{ new Date(item.publishedAt).toLocaleDateString() }}</span>
              </div>
              <NuxtLink :href="item.url" target="_blank" class="block mt-2 text-lg font-semibold text-slate-900 hover:text-sky-600">
                {{ item.title }}
              </NuxtLink>
              <p class="mt-2 text-sm text-slate-600 line-clamp-2">
                {{ item.summary }}
              </p>
              <div class="mt-3 flex flex-wrap gap-2">
                <UBadge v-for="tag in item.tags" :key="tag" color="gray" variant="soft">{{ tag }}</UBadge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-semibold text-slate-900">最新资讯</h2>
          <p class="text-sm text-slate-500">来自核心 AI 媒体与官方博客</p>
        </div>
        <NuxtLink to="/news" class="text-sm text-sky-600 hover:text-sky-700">查看全部</NuxtLink>
      </div>
      <div class="grid gap-4 md:grid-cols-3">
        <UCard v-for="item in latestArticles" :key="item.id" class="h-full flex flex-col">
          <template #header>
            <div class="flex items-center justify-between text-xs text-slate-500">
              <span class="font-semibold text-slate-700">{{ item.source }}</span>
              <span>{{ new Date(item.publishedAt).toLocaleDateString() }}</span>
            </div>
          </template>
          <div class="flex-1 space-y-2">
            <NuxtLink :href="item.url" target="_blank" class="text-lg font-semibold text-slate-900 hover:text-sky-600">
              {{ item.title }}
            </NuxtLink>
            <p class="text-sm text-slate-600 line-clamp-3">
              {{ item.summary }}
            </p>
          </div>
          <template #footer>
            <div class="flex flex-wrap gap-2">
              <UBadge v-for="tag in item.tags" :key="tag" color="gray" variant="soft">{{ tag }}</UBadge>
            </div>
          </template>
        </UCard>
      </div>
    </section>

    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-semibold text-slate-900">精选产品</h2>
          <p class="text-sm text-slate-500">按类别导航，直达官网</p>
        </div>
        <NuxtLink to="/products" class="text-sm text-sky-600 hover:text-sky-700">全部产品</NuxtLink>
      </div>
      <div class="grid gap-4 md:grid-cols-3">
        <UCard v-for="product in featuredProducts" :key="product.id" class="h-full flex flex-col">
          <template #header>
            <div class="flex items-center justify-between text-xs text-slate-500">
              <UBadge color="primary" variant="soft">{{ product.category }}</UBadge>
              <span>{{ product.pricing }}</span>
            </div>
          </template>
          <div class="flex-1 space-y-2">
            <NuxtLink :href="product.url" target="_blank" class="text-lg font-semibold text-slate-900 hover:text-sky-600">
              {{ product.name }}
            </NuxtLink>
            <p class="text-sm text-slate-600 line-clamp-3">{{ product.description }}</p>
          </div>
          <template #footer>
            <div class="flex flex-wrap gap-2">
              <UBadge v-for="tag in product.tags" :key="tag" color="gray" variant="soft">{{ tag }}</UBadge>
            </div>
          </template>
        </UCard>
      </div>
    </section>
  </div>
</template>
