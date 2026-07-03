export type TaskRecommendation = {
  slug: string;
  label: string;
  description: string;
  tools: Array<{ slug: string; reason: string }>;
};

export const taskRecommendations: TaskRecommendation[] = [
  { slug: "writing", label: "写材料", description: "公文、总结、通知与结构化长文", tools: [
    { slug: "kimi", reason: "长材料阅读、提纲梳理和多轮改写效率高" },
    { slug: "tongyi-qianwen", reason: "中文正式表达稳定，适合办公材料初稿" },
    { slug: "doubao", reason: "改写、扩写和口吻调整容易上手" },
  ] },
  { slug: "ppt", label: "做 PPT", description: "从主题、文档或提纲快速生成演示文稿", tools: [
    { slug: "wps-ai", reason: "与 WPS 文档和演示流程衔接紧密" },
    { slug: "iflytek-zhiwen", reason: "适合从一句话或长文快速生成成套页面" },
    { slug: "baidu-wenku-ai", reason: "模板和中文资料型演示场景覆盖较广" },
  ] },
  { slug: "data-analysis", label: "数据分析", description: "表格理解、计算分析与结论说明", tools: [
    { slug: "deepseek", reason: "复杂推理、公式解释和代码分析能力突出" },
    { slug: "kimi", reason: "适合读取长文件并整理分析框架" },
    { slug: "wps-ai", reason: "适合直接处理日常表格和办公数据" },
  ] },
  { slug: "coding", label: "写代码", description: "代码生成、调试、重构和项目理解", tools: [
    { slug: "trae", reason: "AI IDE 工作流完整，适合端到端项目开发" },
    { slug: "tongyi-lingma", reason: "代码补全、问答和企业研发场景成熟" },
    { slug: "deepseek", reason: "代码推理和问题定位能力强，使用门槛低" },
  ] },
  { slug: "ai-search", label: "AI 搜索", description: "联网检索、来源整理与研究综述", tools: [
    { slug: "metaso", reason: "搜索结果结构清晰，便于追溯资料来源" },
    { slug: "kimi-deep-research", reason: "适合多步骤研究和长篇资料汇总" },
    { slug: "doubao", reason: "日常问答与联网搜索入口便捷" },
  ] },
  { slug: "paper-reading", label: "论文阅读", description: "长论文理解、要点提取与文献梳理", tools: [
    { slug: "kimi-deep-research", reason: "适合跨资料检索和研究脉络梳理" },
    { slug: "kimi", reason: "长文档阅读、问答和摘要体验完整" },
    { slug: "tongyi-qianwen", reason: "中文解释与多格式文件处理较均衡" },
  ] },
  { slug: "thesis-review", label: "论文 AI 评阅", description: "格式检查、内容分析、批注与评阅意见", tools: [
    { slug: "gsou-thesis-review", reason: "面向高校论文指导流程建设的专项应用" },
  ] },
  { slug: "agent-building", label: "智能体搭建", description: "模型、工具、知识库和工作流编排", tools: [
    { slug: "ouchn-ai-base", reason: "面向开放大学体系的智能体与 AI 应用平台" },
    { slug: "dify", reason: "工作流、知识库、模型接入和自部署能力完整" },
    { slug: "coze", reason: "零代码搭建和发布智能体，上手速度快" },
  ] },
  { slug: "image-generation", label: "图片生成", description: "中文文生图、设计素材与风格创作", tools: [
    { slug: "jimeng-ai", reason: "中文提示词理解和内容创作流程成熟" },
    { slug: "tongyi-wanxiang", reason: "图像生成与编辑能力覆盖较完整" },
    { slug: "liblibai", reason: "模型和工作流生态丰富，适合进阶创作" },
  ] },
  { slug: "video-generation", label: "视频生成", description: "文生视频、图生视频与镜头控制", tools: [
    { slug: "kling-ai", reason: "运动表现、镜头控制和生成质量突出" },
    { slug: "jimeng-ai", reason: "图片与视频创作衔接顺畅" },
    { slug: "hailuo-video", reason: "短视频生成入口直接，适合快速试作" },
  ] },
  { slug: "meeting-notes", label: "会议纪要", description: "录音转写、摘要、待办与会议归档", tools: [
    { slug: "feishu-minutes", reason: "转写、摘要和团队协作链路完整" },
    { slug: "iflyrec", reason: "中文语音转写和多场景录音处理成熟" },
    { slug: "dingtalk-ai", reason: "适合钉钉组织内的会议与协同办公" },
  ] },
  { slug: "education-office", label: "高校办公", description: "教学、行政、论文和校内 AI 应用", tools: [
    { slug: "ouchn-ai-base", reason: "适合开放大学体系内建设智能体和知识库" },
    { slug: "gsou-thesis-review", reason: "聚焦论文指导、评阅和教学质量管理" },
    { slug: "wps-ai", reason: "覆盖文档、表格和演示等高频办公任务" },
  ] },
  { slug: "knowledge-base", label: "知识库问答", description: "连接组织资料，构建可复用的问答应用", tools: [
    { slug: "dify", reason: "检索、工作流和模型管理能力均衡" },
    { slug: "fastgpt", reason: "面向知识库问答，部署与编排路径清晰" },
    { slug: "ouchn-ai-base", reason: "适合高校知识库和校内智能体应用" },
  ] },
];

export const selectedToolSlugs = [...new Set(taskRecommendations.flatMap((task) => task.tools.map((tool) => tool.slug)))];
export const selectedToolSlugSet = new Set(selectedToolSlugs);

export const usageTipsByTool: Record<string, string[]> = {
  kimi: ["先上传原始材料，再要求按‘事实—问题—建议’输出提纲。", "长文档先做分章节摘要，最后再合并结论并核对页码。"],
  "tongyi-qianwen": ["明确文种、受众、篇幅和语气，再让模型分段生成。", "正式材料至少进行一次事实、数字和政策表述复核。"],
  doubao: ["用一份满意范文约束语气和结构，改写效果更稳定。", "联网答案应打开原始来源核验，不直接复制引用。"],
  "wps-ai": ["在现有文档、表格或 PPT 内调用，先保留原文件副本。", "表格分析先说明字段含义和统计口径，再生成公式或结论。"],
  "iflytek-zhiwen": ["先给出受众、时长、页数和章节，再生成首版 PPT。", "生成后重点检查数据、图片版权和每页信息密度。"],
  "baidu-wenku-ai": ["优先选择接近教学主题的模板，再替换为自有内容。", "引用资料需回到原出处确认作者、时间和数据口径。"],
  deepseek: ["复杂分析要求分步骤推理，并用代码或人工计算复核关键数字。", "编程问题同时提供报错、运行环境和最小复现代码。"],
  trae: ["先让 Agent 阅读项目规则和目录，再分小任务逐步修改。", "每轮修改后运行测试并审查 diff，避免一次改动范围过大。"],
  "tongyi-lingma": ["在仓库中补充清晰的 README 和编码规范，提升上下文质量。", "涉及依赖升级或数据库变更时先要求生成变更说明。"],
  metaso: ["把问题拆成事实、观点和数据三类检索，并限定时间范围。", "优先打开原始来源，不把搜索摘要当作最终证据。"],
  "kimi-deep-research": ["先定义研究问题、时间范围和排除条件，再启动深度检索。", "导出结论前逐条检查引用是否真正支持对应表述。"],
  "gsou-thesis-review": ["先按学校要求准备 Word 论文，再分别检查格式和内容问题。", "AI 意见用于辅助指导，最终评价由指导教师和评阅人员确认。"],
  "ouchn-ai-base": ["先创建小范围知识库和单一任务智能体，再逐步增加工具。", "正式发布前用真实问题测试召回、权限和错误处理。"],
  dify: ["先确定输入、输出和失败分支，再编排工作流节点。", "知识库先清洗标题层级和重复文档，再调整分段与召回参数。"],
  coze: ["从一个明确任务开始配置角色、技能和工作流。", "发布前覆盖正常输入、空输入和异常输入三类测试。"],
  "jimeng-ai": ["提示词写清主体、场景、构图、光线和比例。", "先低成本批量试构图，再对选中结果做高清或视频生成。"],
  "tongyi-wanxiang": ["先确定用途和画面比例，再选择生成或局部编辑。", "人物、文字和品牌元素需要重点检查细节与授权。"],
  liblibai: ["先从成熟模型和公开工作流开始，记录模型、参数与种子。", "商用前核对模型、LoRA 和素材各自的授权条款。"],
  "kling-ai": ["先用关键帧明确主体和镜头，再逐步增加运动描述。", "长视频拆成短镜头生成，最后在剪辑软件中统一节奏。"],
  "hailuo-video": ["用简短明确的主体、动作、镜头和氛围描述试作。", "生成后检查人物一致性、肢体细节和画面跳变。"],
  "feishu-minutes": ["会议前确认参会者知情，并设置正确语言和说话人。", "会后人工核对决策、负责人和截止时间。"],
  iflyrec: ["录音时尽量靠近发言人并减少环境噪声。", "专业术语、人名和数字应结合原音逐项校对。"],
  "dingtalk-ai": ["将会议纪要与群聊、待办和日程联动，减少重复录入。", "涉及敏感会议时先确认组织的数据与录音管理要求。"],
  fastgpt: ["先按业务主题拆分知识库，避免一次导入大量杂乱文档。", "用常见问法建立测试集，持续优化分段、召回和提示词。"],
};

export const curatedStrengths: Record<string, string[]> = {
  kimi: ["长文档阅读与上下文处理", "资料整理和中文写作", "文件问答上手简单"],
  "tongyi-qianwen": ["中文综合能力均衡", "办公与阿里生态衔接", "多格式内容处理"],
  doubao: ["多模态入口完整", "改写和日常问答易用", "用户规模和产品迭代活跃"],
  "wps-ai": ["文档、表格、PPT 一体化", "贴近日常办公操作", "模板和协作生态完整"],
  "iflytek-zhiwen": ["长文转 PPT", "中文演示内容生成", "结构与模板自动组织"],
  "baidu-wenku-ai": ["中文模板资源丰富", "资料型 PPT 生成", "文档与演示场景衔接"],
  deepseek: ["复杂推理和代码能力", "使用和 API 成本有竞争力", "适合分析型任务"],
  trae: ["AI 原生 IDE", "项目级上下文与 Agent 开发", "中文开发体验完整"],
  "tongyi-lingma": ["代码补全和问答", "企业研发工具链适配", "中文技术场景支持"],
  metaso: ["答案结构和来源展示清晰", "适合资料检索与综述", "中文搜索体验完整"],
  "kimi-deep-research": ["多步骤深度研究", "长资料综合整理", "来源型内容生成"],
  "gsou-thesis-review": ["贴合高校论文评阅流程", "格式检查与 Word 批注", "辅助生成评阅意见"],
  "ouchn-ai-base": ["开放大学体系场景", "智能体与知识库建设", "AI 应用统一管理"],
  dify: ["工作流和知识库完整", "多模型接入", "支持开源与自部署"],
  coze: ["零代码上手快", "工具和工作流丰富", "智能体发布路径便捷"],
  "jimeng-ai": ["中文提示词理解", "图片与视频联合创作", "适合内容生产"],
  "tongyi-wanxiang": ["图像生成与编辑", "多种视觉任务覆盖", "中文创作流程"],
  liblibai: ["模型与工作流生态丰富", "适合进阶可控生成", "创作者社区资源多"],
  "kling-ai": ["视频运动表现", "图生视频与镜头控制", "专业创作能力持续迭代"],
  "hailuo-video": ["视频试作速度快", "文生和图生视频", "短内容创作门槛低"],
  "feishu-minutes": ["会议转写与摘要", "待办和协作衔接", "团队归档方便"],
  iflyrec: ["中文语音识别", "多场景录音转写", "专业词汇处理"],
  "dingtalk-ai": ["组织协同和会议联动", "日程、待办与群聊衔接", "适合已有钉钉团队"],
  fastgpt: ["聚焦知识库问答", "可视化工作流", "支持部署和模型接入"],
};

export const nationwideUsageRanking = [
  { rank: 1, name: "豆包", monthlyActiveUsers: "3.45 亿", slug: "doubao" },
  { rank: 2, name: "千问", monthlyActiveUsers: "1.66 亿", slug: "tongyi-qianwen" },
  { rank: 3, name: "DeepSeek", monthlyActiveUsers: "1.27 亿", slug: "deepseek" },
  { rank: 4, name: "腾讯元宝", monthlyActiveUsers: "5735 万", slug: null },
  { rank: 5, name: "蚂蚁阿福", monthlyActiveUsers: "2715 万", slug: null },
  { rank: 6, name: "即梦 AI", monthlyActiveUsers: "1352 万", slug: "jimeng-ai" },
  { rank: 7, name: "Kimi", monthlyActiveUsers: "834 万", slug: "kimi" },
] as const;

export const usageRankingMeta = {
  period: "2026 年 3 月",
  metric: "中国 AI 原生 App 月活跃用户（MAU）",
  note: "月活用户可能跨产品重复，不等于全国人口渗透率；网页端、插件和机构内网使用通常未完整计入。",
  sourceName: "QuestMobile《2026 年一季度 AI 应用洞察》",
  sourceUrl: "https://www.questmobile.com.cn/research/report/2046482337382842370/",
};
