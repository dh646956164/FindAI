# AI工具情报站 MVP

面向中文用户的 AI 工具情报与选型平台。项目不是单纯导航页，而是围绕国内可用性、价格、中文支持、Agent / API / 知识库能力、适用场景和数据合规给出结构化信息。

## 已实现

- 首页：搜索、11 类快捷入口、热门工具、情报和场景推荐
- 工具库：关键词、分类、国内可用性、价格、能力、适用人群筛选，支持卡片 / 列表视图
- 工具详情：可用性、免费额度、能力矩阵、优缺点、场景、合规提示、国内替代和国际竞品
- 11 个实用榜单、Agent 专区、8 篇对比文章、18 个场景指南、AI 情报页
- 管理后台：环境变量账号登录、签名 HttpOnly Cookie、服务端权限复核
- 后台维护：工具、Agent 类型、榜单、对比文章、场景指南和 AI 情报的基础 CRUD
- PostgreSQL + Prisma 数据层；无数据库时前台自动使用 seed 目录只读回退，便于预览
- 100 个首批中文 AI 工具、4 个模型、11 个榜单和关联项目的 seed 数据

## 技术栈

- Next.js 15 App Router、React 19、TypeScript
- Tailwind CSS、shadcn/ui 组件结构、Lucide Icons
- PostgreSQL、Prisma ORM
- Next.js Route Handlers

## 项目结构

```text
app/
├─ api/
│  ├─ admin/[entity]/             # 后台 CRUD API
│  └─ auth/                       # 登录 / 退出
├─ admin/                         # 管理后台
├─ agents/                        # Agent 专区
├─ comparisons/                   # 对比列表与文章
├─ news/                          # AI 情报
├─ rankings/                      # 模型 / 工具榜单
├─ tools/                         # 工具库与详情
├─ use-cases/                     # 场景列表与指南
├─ about/                         # 关于
└─ page.tsx                       # 首页
components/
├─ admin/                         # 后台壳与通用管理器
├─ ui/                            # shadcn/ui 风格基础组件
└─ ...                            # 导航、搜索、工具卡片等
lib/
├─ auth.ts                        # 会话签名与验证
├─ catalog.ts                     # 100 个工具和演示目录
├─ data.ts                        # Prisma 查询与只读回退
├─ prisma.ts                      # Prisma 单例
└─ constants.ts                   # 分类与字典
prisma/
├─ schema.prisma                  # 完整数据模型
└─ seed.ts                        # 初始化数据
scripts/init-db.ps1               # Windows 一键初始化
docker-compose.yml                # 本地 PostgreSQL
```

## 本地运行

### 1. 环境要求

- Node.js 20 或更高版本
- npm 10 或更高版本
- PostgreSQL 15+，或 Docker Desktop

### 2. 安装与配置

```powershell
npm install
Copy-Item .env.example .env
```

至少修改以下环境变量：

```dotenv
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_intel?schema=public"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="请替换为强密码"
AUTH_SECRET="请替换为至少32位随机字符串"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

可用 PowerShell 生成 `AUTH_SECRET`：

```powershell
[Convert]::ToBase64String([Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

### 3. 初始化数据库

有 Docker Desktop 时可一键执行：

```powershell
.\scripts\init-db.ps1
```

或手动执行：

```powershell
docker compose up -d postgres
npm run db:generate
npm run db:push
npm run db:seed
```

seed 完成后会输出 `100 个工具、11 个榜单、18 个场景`。重复执行 seed 是安全的，核心数据使用 upsert 更新。

### 4. 启动

```powershell
npm run dev
```

打开：

- 前台：<http://localhost:3000>
- 后台：<http://localhost:3000/admin>

### 5. 质量检查

```powershell
npm run typecheck
npm run build
```

## 搜索实现

MVP 使用 Prisma + PostgreSQL `contains` / 数组字段过滤。搜索入口都通过 `lib/data.ts`，后续接入 Meilisearch 或 Typesense 时可新增搜索适配器，不需要改页面组件。

生产数据必须执行数据库初始化。只读回退仅供本地预览；后台写操作始终依赖 PostgreSQL，不会写入静态目录。

## 部署到 Vercel + Supabase

1. 在 Supabase 创建项目，复制 PostgreSQL Session Pooler 连接串。
2. 在 Vercel 导入仓库，添加 `.env.example` 中的全部环境变量。
3. 本地或 CI 使用生产 `DATABASE_URL` 执行：

   ```powershell
   npm run db:push
   npm run db:seed
   ```

4. Vercel 构建命令使用默认的 `npm run build`。
5. 将 `NEXT_PUBLIC_SITE_URL` 改为正式域名，并使用强随机 `AUTH_SECRET` 和管理员密码。

如果采用阿里云 / 腾讯云，可使用 Docker Compose 部署 PostgreSQL，并以 `npm run build && npm run start` 启动应用；生产环境建议在前端增加 Nginx、TLS、数据库备份和进程守护。

## 数据维护与扩展

- 工具能力和价格会变化，更新时同步维护 `lastCheckedAt`。
- 组织使用前必须人工确认服务条款、数据处理范围和采购合规性。
- 数据结构已为 RSS / 爬虫、AI 自动总结、收藏评分、价格提醒、可用性检测、会员和周报预留清晰扩展位置。
- 若增加用户系统，建议将当前管理员会话替换为 Auth.js，并在现有 `User` 表上增加普通用户角色和收藏关系。

## 常用命令

```powershell
npm run dev          # 开发服务器
npm run build        # 生产构建
npm run start        # 生产服务器
npm run typecheck    # TypeScript 检查
npm run db:generate  # 生成 Prisma Client
npm run db:push      # 同步 schema
npm run db:seed      # 写入示例数据
npm run db:studio    # 可视化管理数据库
```
