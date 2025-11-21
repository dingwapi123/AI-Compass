export type Article = {
  id: string
  title: string
  source: string
  url: string
  summary: string
  tags: string[]
  publishedAt: string
  featured?: boolean
}

export type Product = {
  id: string
  name: string
  url: string
  category: '编码类' | '图像生成' | '视频生成'
  tags: string[]
  pricing: '免费' | '试用' | '订阅'
  description: string
  logo?: string
  featured?: boolean
  updatedAt?: string
}

export const sampleArticles: Article[] = [
  {
    id: 'a1',
    title: 'OpenAI 发布 GPT-4.2，提升多模态推理与安全控制',
    source: 'OpenAI Blog',
    url: 'https://openai.com/blog',
    summary: '新版本加强多模态推理与安全防护，提供更快的响应与更细粒度的控制。',
    tags: ['多模态', '模型发布'],
    publishedAt: '2024-11-15T08:00:00Z',
    featured: true
  },
  {
    id: 'a2',
    title: 'Anthropic Cloud 3 更新，代码助手体验升级',
    source: 'Anthropic',
    url: 'https://www.anthropic.com/news',
    summary: '强化对长上下文的代码补全与解释，集成多轮对话的安全约束。',
    tags: ['编码类', '助手'],
    publishedAt: '2024-11-14T10:00:00Z'
  },
  {
    id: 'a3',
    title: 'Hugging Face 发布推理加速方案，边缘部署更快',
    source: 'Hugging Face',
    url: 'https://huggingface.co/blog',
    summary: '通过新编译链与量化策略，在边缘设备上提升推理吞吐与延迟表现。',
    tags: ['部署', '推理加速'],
    publishedAt: '2024-11-13T12:00:00Z'
  },
  {
    id: 'a4',
    title: 'Google AI 图像生成模型更新，摄影风格更稳定',
    source: 'Google AI',
    url: 'https://ai.googleblog.com',
    summary: '升级后的图像生成在风格稳定性与细节保真度上有显著提升。',
    tags: ['图像生成'],
    publishedAt: '2024-11-12T09:30:00Z'
  }
]

export const sampleProducts: Product[] = [
  {
    id: 'p1',
    name: 'Cursor',
    url: 'https://www.cursor.com',
    category: '编码类',
    tags: ['编码类', 'IDE'],
    pricing: '订阅',
    description: 'AI 原生 IDE，提供上下文感知的代码补全与重构助手。',
    featured: true,
    updatedAt: '2024-11-10T00:00:00Z'
  },
  {
    id: 'p2',
    name: 'Midjourney',
    url: 'https://www.midjourney.com',
    category: '图像生成',
    tags: ['图像生成'],
    pricing: '订阅',
    description: '高质量 AI 生图工具，支持多风格与细节调整。'
  },
  {
    id: 'p3',
    name: 'Runway',
    url: 'https://runwayml.com',
    category: '视频生成',
    tags: ['视频生成', '多模态'],
    pricing: '试用',
    description: '面向创作者的视频生成与编辑平台，支持文本/图像/剪辑到视频。',
    featured: true,
    updatedAt: '2024-11-05T00:00:00Z'
  },
  {
    id: 'p4',
    name: 'V0 by Vercel',
    url: 'https://v0.dev',
    category: '编码类',
    tags: ['编码类', '多模态'],
    pricing: '免费',
    description: 'AI UI 生成与代码导出工具，适合前端快速启动。'
  },
  {
    id: 'p5',
    name: 'Pika Labs',
    url: 'https://www.pika.art',
    category: '视频生成',
    tags: ['视频生成'],
    pricing: '订阅',
    description: '文本/图像到视频的生成模型，支持风格控制与高清导出。'
  }
]

export const categories = ['编码类', '图像生成', '视频生成'] as const
export const pricingOptions = ['免费', '试用', '订阅'] as const
