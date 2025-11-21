<script setup lang="ts">
import {
  categories,
  pricingOptions,
  sampleProducts,
} from "../utils/sample-data"

const search = ref("")
const selectedCategory = ref<"全部" | (typeof categories)[number]>("全部")
const selectedPricing = ref<"全部" | (typeof pricingOptions)[number]>("全部")

const filtersCategory = ["全部", ...categories]
const filtersPricing = ["全部", ...pricingOptions]

const filteredProducts = computed(() =>
  sampleProducts.filter((item) => {
    const matchCategory =
      selectedCategory.value === "全部" ||
      item.category === selectedCategory.value
    const matchPricing =
      selectedPricing.value === "全部" || item.pricing === selectedPricing.value
    const text = `${item.name} ${item.description} ${item.tags.join(
      " "
    )}`.toLowerCase()
    const matchSearch = text.includes(search.value.trim().toLowerCase())
    return matchCategory && matchPricing && matchSearch
  })
)
</script>

<template>
  <div class="space-y-8 text-slate-900 dark:text-slate-50 transition-colors">
    <div class="space-y-2">
      <h1 class="text-3xl font-semibold text-slate-900 dark:text-white">
        AI 产品导航
      </h1>
      <p class="text-slate-600 dark:text-slate-300">
        分类、标签与定价过滤，卡片直达官网。
      </p>
    </div>

    <div class="flex flex-wrap gap-3 items-center">
      <UInput
        v-model="search"
        placeholder="搜索产品名称或标签"
        icon="i-heroicons-magnifying-glass"
        class="w-full sm:w-72"
      />
      <USelect
        v-model="selectedCategory"
        :options="filtersCategory"
        icon="i-heroicons-rectangle-stack"
        color="primary"
      />
      <USelect
        v-model="selectedPricing"
        :options="filtersPricing"
        icon="i-heroicons-currency-dollar"
        color="info"
      />
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <UCard
        v-for="product in filteredProducts"
        :key="product.id"
        class="h-full hover:border-sky-200 transition border-slate-200 dark:border-slate-800 dark:bg-slate-900/70"
      >
        <div class="flex flex-col gap-2">
          <div
            class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400"
          >
            <div class="flex items-center gap-2">
              <UBadge color="primary" variant="soft">{{
                product.category
              }}</UBadge>
              <UBadge
                v-if="product.featured"
                color="primary"
                variant="solid"
                icon="i-heroicons-sparkles"
              >
                精选
              </UBadge>
            </div>
            <span>{{ product.pricing }}</span>
          </div>
          <NuxtLink
            :href="product.url"
            target="_blank"
            class="text-xl font-semibold text-slate-900 hover:text-sky-600 dark:text-slate-50 dark:hover:text-cyan-200"
          >
            {{ product.name }}
          </NuxtLink>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {{ product.description }}
          </p>
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="tag in product.tags"
              :key="tag"
              color="primary"
              variant="soft"
            >
              {{ tag }}
            </UBadge>
          </div>
          <div
            v-if="product.updatedAt"
            class="text-xs text-slate-500 dark:text-slate-400"
          >
            最近更新：{{ new Date(product.updatedAt).toLocaleDateString() }}
          </div>
          <div class="pt-2">
            <UButton
              :href="product.url"
              target="_blank"
              color="info"
              icon="i-heroicons-arrow-top-right-on-square"
            >
              访问官网
            </UButton>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
