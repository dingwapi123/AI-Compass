<script setup lang="ts">
const toast = useToast()

const form = reactive({
  type: '产品',
  title: '',
  url: '',
  description: '',
  contact: ''
})

const optionsType = ['产品', '资讯']

const handleSubmit = () => {
  toast.add({
    title: '提交成功（示例）',
    description: '实际环境将写入 submissions 表或发送审核队列。',
    color: 'primary'
  })
  form.title = ''
  form.url = ''
  form.description = ''
  form.contact = ''
}
</script>

<template>
  <div class="max-w-2xl space-y-6">
    <div class="space-y-2">
      <h1 class="text-3xl font-semibold text-slate-900">提交产品 / 资讯线索</h1>
      <p class="text-slate-600">
        你的提交将进入审核队列（当前为示例，本地存储）。建议附上官网链接和简短描述。
      </p>
    </div>

    <UCard>
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div class="grid gap-4 sm:grid-cols-2">
          <UFormGroup label="类型" name="type">
            <USelect v-model="form.type" :options="optionsType" />
          </UFormGroup>
          <UFormGroup label="官网链接" name="url" required>
            <UInput v-model="form.url" placeholder="https://example.com" type="url" required />
          </UFormGroup>
        </div>

        <UFormGroup label="名称 / 标题" name="title" required>
          <UInput v-model="form.title" placeholder="产品名称或资讯标题" required />
        </UFormGroup>

        <UFormGroup label="描述" name="description">
          <UTextarea
            v-model="form.description"
            placeholder="简单介绍场景、亮点或内容摘要"
            :rows="4"
          />
        </UFormGroup>

        <UFormGroup label="联系方式（可选）" name="contact">
          <UInput v-model="form.contact" placeholder="邮箱或社媒账号" />
        </UFormGroup>

        <div class="flex items-center justify-between">
          <p class="text-xs text-slate-500">
            提交后将进入审核（真实环境会写入 Supabase submissions）。
          </p>
          <UButton type="submit" icon="i-heroicons-paper-airplane" color="primary">
            提交
          </UButton>
        </div>
      </form>
    </UCard>
  </div>
</template>
