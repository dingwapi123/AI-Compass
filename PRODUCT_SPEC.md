# 产品/技术方案（AI 导航与资讯站）

## 1. 定位与目标
- 面向 AI 从业者/爱好者，提供每日最新 AI 资讯与 AI 产品导航。
- 快速浏览、快速跳转为主；无账号体系（收藏可用本地存储，二期再做账号）。

## 2. 核心功能
- **资讯流**：时间排序，来源/标签筛选，卡片外链；可选轻量详情页。
- **产品导航**：分类（编码类、图像生成、视频生成），标签与定价过滤；卡片外链官网。
- **搜索**：全局检索资讯（标题/摘要）与产品（名称/标签）。
- **提交入口**：提交新产品/线索，写入 submissions（可二期上线）。
- **订阅（可选二期）**：RSS/Atom 输出；邮件周报。

## 3. 信息源与更新
- **媒体 RSS/Atom（初版建议）**：
  - 英文：OpenAI Blog、Anthropic Blog、Google AI Blog、Meta AI Blog、Hugging Face Blog、TechCrunch AI、The Verge AI。
  - 中文（需确认条款/可用性）：机器之心、量子位（如有 RSS 或需抓取许可）。
- **抓取策略**：Supabase Edge Function 定时拉取；按链接 + 发布时间去重；允许源权重与手动精选。
- **字段保留**：title、url、source、summary、tags[]、published_at、featured。

## 4. 产品分类与元数据
- **主类别**：`编码类`、`图像生成`、`视频生成`。
- **扩展标签**（可选）：多模态、语音/配音、办公助手、客服/聊天、文案/写作。
- **定价枚举**：`免费` / `试用` / `订阅`。
- **产品字段**：name, url, category, tags[], pricing, description, logo, featured, updated_at, created_at。

## 5. 技术架构
- **前端**：Nuxt 4 + Nuxt UI 4，Tailwind 主题（蓝/白）；SSR/Hybrid + ISR。
- **数据层**：Supabase Postgres；Edge Functions 抓取/清洗 RSS；远程存储 Logo 可选。
- **搜索/过滤**：前期客户端过滤 + 简单全文（tsvector）；后续可接 Algolia/Meilisearch。
- **缓存策略**：资讯 ISR（5–15 分钟），产品日级刷新；Nuxt Image 远程优化。
- **部署**：Vercel；环境变量注入 Supabase URL/Key、FEEDS 配置等。
- **监控（可选）**：Vercel Analytics + Sentry。

## 6. 数据模型（SQL 示意）
- `articles`:
  - id uuid (pk), title text, url text, source text, summary text, tags text[], published_at timestamptz, featured bool default false, created_at timestamptz default now()
- `products`:
  - id uuid (pk), name text, url text, category text, tags text[], pricing text, description text, logo text, featured bool default false, updated_at timestamptz, created_at timestamptz default now()
- `submissions`（二期备用）:
  - id uuid (pk), type text, payload jsonb, status text default 'pending', created_at timestamptz default now()

## 7. 抓取流程（Edge Function 草案）
1. 读取 FEEDS 列表（{url, source, tags, weight}）。
2. 拉取 + 解析 RSS/Atom。
3. 去重（link + 时间窗口）；可按 weight/时间置顶。
4. 插入/更新 `articles`，保留 title/url/summary/published_at/tags/source/featured。
5. 失败上报（日志），可选重试队列。

## 8. 信息架构与交互
- **首页**：今日精选 + 最新资讯时间线 + 精选产品卡片；顶部分类/筛选入口。
- **资讯页**：来源/标签筛选，骨架屏，外链或轻量详情。
- **产品页**：分类/标签/定价过滤，卡片主区外链官网。
- **搜索页**：分资讯/产品标签页的结果。
- **提交通道**：表单写入 submissions（仅管理员查看）。
- **移动端**：单列布局，筛选用底部抽屉；卡片大点击区。
- **SEO**：sitemap、结构化数据（Article/NewsArticle、ItemList）、规范 meta/OG。

## 9. 品牌与设计
- **色彩**：蓝/白为主，科技感，暗黑模式可二期。
- **组件**：沿用 Nuxt UI 4 组件（Card、List、Tabs、CommandPalette、Skeleton、Badge、Pagination 等）。
- **动效**：页面加载/卡片浮动的轻量过渡，避免过度动效。

## 10. 路线图（执行顺序）
1) 初始化 Nuxt 4 + Nuxt UI 4 项目骨架，蓝白主题，核心页面骨架与路由。
2) 提供 Supabase 建表 SQL、示例种子数据（articles/products）。
3) 编写 Edge Function 模板 + FEEDS 配置示例，接入 Supabase。
4) 配置 Vercel 部署（ISR、环境变量），本地 `.env.example`。
5) 二期：搜索增强、邮件周报、更多分类/标签，多语种/暗黑模式（可选）。
