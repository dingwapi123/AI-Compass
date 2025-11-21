# AI 导航与资讯站（Nuxt 4 + Nuxt UI 4）

## 项目概览
- **目标**：提供每日 AI 资讯与产品导航，强调快速浏览与快速跳转，无账号体系。
- **技术栈**：Nuxt 4（SSR/Hybrid）、Nuxt UI 4、Tailwind 主题（蓝/白）、Supabase（Postgres + Edge Functions）、Vercel 部署。
- **核心页面**：首页（精选/最新资讯 + 精选产品）、资讯列表、产品导航、搜索、提交入口。

## 功能要点
- 资讯流：按时间排序，支持标签/来源筛选，可外链跳转或简讯详情。
- 产品导航：分类（编码类、图像生成、视频生成），标签与定价过滤，卡片外链产品官网。
- 搜索：全局检索资讯标题/摘要、产品名称/标签。
- 提交入口：简单表单写入 submissions（可二期上线）。
- 订阅（可选二期）：RSS/Atom 输出，邮件周报。

## 数据与架构
- **数据源（资讯）**：媒体 RSS/Atom（OpenAI Blog、Anthropic Blog、Google AI Blog、Meta AI Blog、Hugging Face Blog、TechCrunch AI、The Verge AI 等），Edge Function 定时拉取，按链接+时间去重，保留摘要/标签/源。
- **产品数据**：手动或后台录入，字段：name、url、category、tags[]、pricing、description、logo、featured、updated_at。
- **数据库（Supabase）** 表：
  - `articles`: id, title, url, source, summary, tags[], published_at, featured, created_at
  - `products`: id, name, url, category, tags[], pricing, description, logo, featured, updated_at, created_at
  - `submissions`（二期可用）: type, payload jsonb, status, created_at
- **抓取流程**：Edge Function `fetch-feeds` -> 拉取/解析 RSS -> 去重 -> 插入/更新 `articles`；源权重与标签映射在函数配置。
- **缓存**：资讯采用 ISR（5–15 分钟），产品日级刷新；远程图片走 Nuxt Image。

## 信息架构
- 首页：今日精选 + 最新资讯列表 + 精选产品卡片 + 快捷筛选。
- 资讯页：时间线列表，来源/标签筛选，骨架屏，外链或简短详情页。
- 产品页：分类/标签/定价过滤，卡片主区直接外链官网。
- 搜索：结果分资讯/产品标签页。
- 提交页：提交产品/线索，进入 submissions。

## 设计与体验
- 视觉：蓝白主色，简洁科技感；暗黑模式可二期。
- 交互：卡片主区域即跳转；筛选状态清晰；移动端单列 + 底部/抽屉式筛选；骨架屏提升首屏感知。
- SEO：站点地图、结构化数据（Article/NewsArticle、ItemList）、规范的 meta/OG。

## 本地开发
- 依赖安装：`pnpm install`
- 开发：`pnpm dev`
- 构建：`pnpm build`
- 预览：`pnpm preview`
- 环境变量示例见 `.env.example`（Supabase URL/Key、FEEDS 列表等）。

## 部署与运行
- 部署目标：Vercel（默认 SSR/Hybrid，支持 ISR）。
- 监控：可用 Vercel Analytics + Sentry（可选）。

## 路线图（建议）
- M1：Nuxt 4 + Nuxt UI 4 骨架；静态 JSON/示例数据；前端筛选/搜索；提交表单占位。
- M2：Supabase 表落地；Edge Function 抓取 RSS；去重/精选标记；ISR 配置。
- M3：搜索增强（tsvector/Algolia/Meili）；邮件周报；更多分类/标签；多语种。

## 后续
确认方案后，将继续接入 Supabase（表、Edge Function 模板）、完善数据接入与样式细节。
