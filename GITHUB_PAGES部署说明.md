# GitHub Pages 静态部署说明

该部署只发布公开前台，不包含数据库、管理员登录、后台 CRUD 和 API。

保留功能：

- 首页和任务入口
- 工具库搜索、筛选、排序和视图切换
- 工具详情、外部使用链接
- 榜单、Agent、工具对比、场景推荐和 AI 情报

## 首次发布

1. 在 GitHub 创建名为 `FindAI` 的仓库。
2. 将本项目上传到仓库的 `main` 分支。
3. 打开仓库的 `Settings → Pages`。
4. 在 `Build and deployment` 中将 Source 设置为 `GitHub Actions`。
5. 打开仓库的 `Actions` 页面，等待 `Deploy static site to GitHub Pages` 完成。

发布地址通常为：

```text
https://你的GitHub用户名.github.io/FindAI/
```

以后只要向 `main` 分支提交代码，GitHub Actions 就会自动重新构建和发布。

## 注意

- `.env` 不应上传到 GitHub。
- 静态版本不需要配置 PostgreSQL 或 Supabase。
- GitHub Actions 仅在临时构建环境中排除 `app/admin`、`app/api` 和 `middleware.ts`，本地源码不会被删除。
- 如果仓库名称不是 `FindAI`，工作流会自动使用实际仓库名称作为访问路径。
