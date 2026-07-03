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

// 前五项采用 QuestMobile 2026 年 3 月公开月活顺序；其余未披露统一 MAU 的专业工具
// 放在已知数据之后，并按公开产品覆盖、生态规模与实际任务普及度保持稳定顺序。
export const nationalUsageOrder = [
  "doubao", "tongyi-qianwen", "deepseek", "jimeng-ai", "kimi",
  "wps-ai", "dingtalk-ai", "baidu-wenku-ai", "iflyrec", "feishu-minutes",
  "kling-ai", "coze", "trae", "tongyi-lingma", "metaso", "tongyi-wanxiang",
  "hailuo-video", "iflytek-zhiwen", "liblibai", "kimi-deep-research", "dify",
  "fastgpt", "ouchn-ai-base", "gsou-thesis-review",
] as const;

const nationalUsageIndex = new Map<string, number>(nationalUsageOrder.map((slug, index) => [slug, index]));

export function compareNationalUsage(a: { slug: string }, b: { slug: string }) {
  return (nationalUsageIndex.get(a.slug) ?? Number.MAX_SAFE_INTEGER) - (nationalUsageIndex.get(b.slug) ?? Number.MAX_SAFE_INTEGER);
}

export function sortByNationalUsage<T extends { slug: string }>(items: readonly T[]): T[] {
  return [...items].sort(compareNationalUsage);
}

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

export type AgentPlatform = {
  rank: number;
  name: string;
  company: string;
  officialUrl: string;
  description: string;
  platformType: string;
  tags: string[];
  usageBasis: string;
};

export const agentPlatformDirectory: AgentPlatform[] = [
  { rank: 1, name: "扣子 Coze", company: "字节跳动", officialUrl: "https://www.coze.cn/", platformType: "零代码智能体平台", tags: ["工作流", "知识库", "插件", "发布"], usageBasis: "字节生态与大众创作入口", description: "面向个人和团队的智能体开发平台，支持提示词、知识库、插件与工作流编排，可快速完成创建、调试和发布。" },
  { rank: 2, name: "阿里云百炼", company: "阿里云", officialUrl: "https://bailian.console.aliyun.com/", platformType: "云端 Agent 开发平台", tags: ["千问模型", "RAG", "MCP", "API"], usageBasis: "千问用户规模与阿里云覆盖", description: "提供零代码智能体、工作流、知识库、插件和 API 调用，适合从原型验证到企业系统集成。" },
  { rank: 3, name: "腾讯元器", company: "腾讯", officialUrl: "https://yuanqi.tencent.com/", platformType: "腾讯生态智能体平台", tags: ["零代码", "公众号", "Multi-Agent", "工作流"], usageBasis: "微信与腾讯内容生态", description: "支持标准、单工作流和 Multi-Agent 模式，可连接知识库并发布至公众号、企业微信、应用宝和 API。" },
  { rank: 4, name: "百度千帆 AppBuilder", company: "百度智能云", officialUrl: "https://cloud.baidu.com/product/ai-apaas", platformType: "AI 原生应用工作台", tags: ["零代码", "低代码", "组件", "Agent API"], usageBasis: "百度云与搜索生态覆盖", description: "提供零代码应用创建、低代码工作流和组件扩展，适合知识问答、业务助手与 AI 原生应用开发。" },
  { rank: 5, name: "火山引擎 HiAgent", company: "火山引擎", officialUrl: "https://www.volcengine.com/product/hiagent", platformType: "企业级 Agent 平台", tags: ["MCP", "工作流", "评测", "私有化"], usageBasis: "豆包与火山引擎企业生态", description: "覆盖智能体搭建、纳管、评测、观测和企业系统接入，支持插件、MCP、知识库、工作流及私有化部署。" },
  { rank: 6, name: "腾讯云 ADP", company: "腾讯云", officialUrl: "https://cloud.tencent.com/product/adp", platformType: "企业智能体开发平台", tags: ["Agentic RAG", "Multi-Agent", "评测", "治理"], usageBasis: "企业行业项目与腾讯云覆盖", description: "面向企业的一站式 Agent 开发与运营平台，支持 RAG、工作流、多智能体、评测、监控和权限治理。" },
  { rank: 7, name: "华为云 AgentArts", company: "华为云", officialUrl: "https://www.huaweicloud.com/product/agentarts.html", platformType: "企业级智能体平台", tags: ["多智能体", "Skills", "MCP", "可观测"], usageBasis: "华为云政企与行业覆盖", description: "支持单智能体、工作流与多智能体协作，集成 Skills、MCP、知识库、运行观测和自动化评测。" },
  { rank: 8, name: "讯飞星火智能体", company: "科大讯飞", officialUrl: "https://agent.xfyun.cn/home", platformType: "星火智能体开发平台", tags: ["星火模型", "知识库", "插件", "语音"], usageBasis: "教育、政企与语音生态覆盖", description: "基于讯飞星火模型提供角色配置、知识库、插件与应用发布能力，适合教育、办公和语音交互场景。" },
  { rank: 9, name: "智谱开放平台 Agent", company: "智谱 AI", officialUrl: "https://www.bigmodel.cn/agent", platformType: "模型与智能体开发平台", tags: ["GLM", "工具调用", "知识库", "API"], usageBasis: "GLM 开发者与开放平台生态", description: "依托 GLM 模型提供智能体和工具调用能力，面向开发者完成知识增强、任务执行与 API 集成。" },
  { rank: 10, name: "百度秒哒", company: "百度", officialUrl: "https://cloud.baidu.com/product-s/miaoda_home", platformType: "生成式应用开发平台", tags: ["无代码", "多智能体", "应用生成", "一键发布"], usageBasis: "百度生态与生成式应用覆盖", description: "通过自然语言和多智能体协作生成应用，支持在线编辑、实时预览与发布，适合快速制作网站、轻应用和业务原型。" },
];

export type HotAgentProduct = {
  rank: number;
  name: string;
  company: string;
  officialUrl: string;
  actionLabel: string;
  description: string;
  tags: string[];
  warning?: string;
};

// 面向普通用户、能够直接执行任务的 Agent，与上方的 Agent 开发平台分开展示。
export const hotAgentProducts: HotAgentProduct[] = [
  { rank: 1, name: "WorkBuddy", company: "腾讯", officialUrl: "https://www.workbuddy.cn/", actionLabel: "访问 / 下载", tags: ["电脑操作", "办公自动化", "多步骤任务"], description: "面向日常办公和电脑操作的桌面 Agent，可理解任务、调用本地工具并执行多步骤工作，适合资料整理、文件处理与跨应用协作。" },
  { rank: 2, name: "OpenClaw", company: "开源社区", officialUrl: "https://github.com/openclaw/openclaw/releases/", actionLabel: "下载发行版", tags: ["开源", "本地执行", "Skills"], description: "近期活跃的开源执行型 Agent，可连接工具与 Skills 完成自动化任务，适合具备部署和安全审查能力的进阶用户。", warning: "具备较高系统权限；安装第三方 Skills 前应审查来源与代码。" },
  { rank: 3, name: "MiniMax Agent", company: "MiniMax", officialUrl: "https://agent.minimax.io/", actionLabel: "立即使用", tags: ["通用任务", "网页执行", "内容生成"], description: "面向研究、内容制作和网页任务的通用 Agent，可围绕目标组织步骤、调用能力并交付结果。" },
  { rank: 4, name: "Kimi 深度研究", company: "月之暗面", officialUrl: "https://www.kimi.com/features/deep-research", actionLabel: "立即使用", tags: ["深度研究", "资料检索", "报告生成"], description: "针对复杂研究问题自动拆解检索步骤、汇总来源并生成结构化报告，适合论文阅读、行业研究和材料准备。" },
  { rank: 5, name: "扣子空间", company: "字节跳动", officialUrl: "https://www.coze.cn/", actionLabel: "立即使用", tags: ["通用 Agent", "深度研究", "任务执行"], description: "面向普通用户的任务执行入口，可围绕目标组织信息、调用工具并生成网页、报告等结果，与扣子开发平台形成互补。" },
];
