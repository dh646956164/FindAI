import { compareNationalUsage, curatedStrengths, selectedToolSlugSet, sortByNationalUsage, taskRecommendations } from "@/lib/curated";

export type CatalogTool = {
  name: string;
  slug: string;
  company: string;
  country: string;
  officialUrl?: string;
  category: string;
  subCategories: string[];
  shortDescription: string;
  longDescription: string;
  domesticAccessibility: "DIRECT" | "SPECIAL_NETWORK" | "UNSTABLE" | "NOT_RECOMMENDED" | "UNKNOWN";
  pricingModel: "FREE" | "FREEMIUM" | "PAID" | "OPEN_SOURCE" | "ENTERPRISE";
  freePlan: boolean;
  freeQuota: string;
  chineseInterface: boolean;
  chineseInputOutput: boolean;
  supportsFileUpload: boolean;
  supportsWebSearch: boolean;
  supportsImageUnderstanding: boolean;
  supportsImageGeneration: boolean;
  supportsVideoGeneration: boolean;
  supportsVoiceInput: boolean;
  supportsTextToSpeech: boolean;
  supportsApi: boolean;
  supportsAgent: boolean;
  supportsKnowledgeBase: boolean;
  supportsWorkflow: boolean;
  supportsMcp: boolean;
  supportsPlugins: boolean;
  supportsPrivateDeployment: boolean;
  supportsLocalDeployment: boolean;
  useCases: string[];
  targetUsers: string[];
  strengths: string[];
  weaknesses: string[];
  bestFor: string[];
  notFor: string[];
  complianceNotes: string;
  domesticAlternatives: string[];
  internationalAlternatives: string[];
  rating: number;
  recommendationLevel: number;
  isFeatured: boolean;
  agentType?: string;
};

type ToolDef = [name: string, slug: string, company: string, category?: string];

const assistantDefs: ToolDef[] = [
  ["豆包", "doubao", "字节跳动"], ["通义千问", "tongyi-qianwen", "阿里巴巴"], ["Kimi", "kimi", "月之暗面"],
  ["DeepSeek", "deepseek", "深度求索"], ["智谱清言", "chatglm", "智谱 AI"], ["文心一言", "ernie-bot", "百度"],
  ["腾讯元宝", "tencent-yuanbao", "腾讯"], ["讯飞星火", "iflytek-spark", "科大讯飞"], ["MiniMax", "minimax", "MiniMax"],
  ["海螺 AI", "hailuo-ai", "MiniMax"], ["天工 AI", "tiangong-ai", "昆仑万维"], ["360 智脑", "360-zhinao", "360"],
  ["纳米 AI", "nami-ai", "360"], ["商量 SenseChat", "sensechat", "商汤科技"], ["日日新 SenseNova", "sensenova", "商汤科技"],
  ["百川智能", "baichuan-ai", "百川智能"], ["零一万物 Yi", "01-ai-yi", "零一万物"], ["阶跃星辰 StepFun", "stepfun", "阶跃星辰"],
  ["昆仑万维 SkyWork", "skywork", "昆仑万维"], ["面壁智能 MiniCPM", "minicpm", "面壁智能", "开源 / 自部署"],
];

const apiDefs: ToolDef[] = [
  ["阿里云百炼", "aliyun-bailian", "阿里云"], ["火山方舟", "volcengine-ark", "火山引擎"], ["百度千帆", "baidu-qianfan", "百度智能云"],
  ["腾讯云混元", "tencent-hunyuan", "腾讯云"], ["讯飞开放平台", "iflytek-open", "科大讯飞"], ["智谱开放平台", "bigmodel", "智谱 AI"],
  ["MiniMax 开放平台", "minimax-open", "MiniMax"], ["ModelScope 魔搭", "modelscope", "阿里达摩院", "开源 / 自部署"], ["SiliconFlow 硅基流动", "siliconflow", "硅基流动"],
  ["百度智能云千帆 Agent 平台", "qianfan-agent-platform", "百度智能云", "AI Agent"], ["火山引擎扣子开发平台", "coze-dev-platform", "火山引擎", "AI Agent"],
  ["阿里云 DashScope", "dashscope", "阿里云"], ["腾讯云 AI 代码/模型服务", "tencent-ai-model-service", "腾讯云"],
  ["华为云盘古大模型", "huawei-pangu", "华为云"], ["商汤日日新开放平台", "sensenova-open", "商汤科技"],
];

const agentDefs: ToolDef[] = [
  ["扣子 Coze", "coze", "字节跳动"], ["腾讯元器", "tencent-yuanqi", "腾讯"], ["Dify", "dify", "LangGenius"],
  ["FastGPT", "fastgpt", "Labring"], ["Kimi Agent Swarm", "kimi-agent-swarm", "月之暗面"], ["天工超级智能体", "tiangong-super-agent", "昆仑万维"],
  ["纳米 AI 多智能体", "nami-multi-agent", "360"], ["百度千帆 Agent", "baidu-qianfan-agent", "百度智能云"], ["钉钉 AI 助理", "dingtalk-ai-assistant", "阿里巴巴"],
  ["飞书 AI", "feishu-ai", "字节跳动"], ["Coze Space / 扣子空间", "coze-space", "字节跳动"], ["Dify 自部署版", "dify-self-hosted", "LangGenius", "开源 / 自部署"],
  ["FastGPT 云版", "fastgpt-cloud", "Labring"], ["n8n 中文生态", "n8n-cn", "n8n", "开源 / 自部署"], ["MaxKB", "maxkb", "1Panel", "开源 / 自部署"],
  ["国家开放大学 AI 基座平台", "ouchn-ai-base", "国家开放大学"],
];

const searchDefs: ToolDef[] = [
  ["秘塔 AI 搜索", "metaso", "秘塔科技"], ["纳米 AI 搜索", "nami-search", "360"], ["夸克 AI", "quark-ai", "阿里巴巴"],
  ["天工 AI 搜索", "tiangong-search", "昆仑万维"], ["360 AI 搜索", "360-ai-search", "360"], ["百度 AI 搜索", "baidu-ai-search", "百度"],
  ["Kimi Deep Research", "kimi-deep-research", "月之暗面", "AI 学术"], ["豆包搜索", "doubao-search", "字节跳动"], ["通义联网搜索", "tongyi-web-search", "阿里巴巴"],
  ["秘塔写作猫", "xiezuocat", "秘塔科技", "AI 办公"],
];

const officeDefs: ToolDef[] = [
  ["WPS AI", "wps-ai", "金山办公"], ["WPS 365", "wps-365", "金山办公"], ["钉钉 AI", "dingtalk-ai", "阿里巴巴"],
  ["飞书妙记", "feishu-minutes", "字节跳动"], ["飞书智能会议纪要", "feishu-ai-minutes", "字节跳动"], ["腾讯文档智能助手", "tencent-docs-ai", "腾讯"],
  ["腾讯文档 Skill", "tencent-docs-skill", "腾讯"], ["夸克文档", "quark-docs", "阿里巴巴"], ["百度文库 AI", "baidu-wenku-ai", "百度"],
  ["讯飞听见", "iflyrec", "科大讯飞", "AI 音频"], ["讯飞智文", "iflytek-zhiwen", "科大讯飞"], ["石墨文档 AI", "shimo-ai", "石墨文档"],
  ["有道云笔记 AI", "youdao-note-ai", "网易有道"], ["印象笔记 AI", "yinxiang-ai", "印象笔记"], ["ProcessOn AI", "processon-ai", "ProcessOn"],
  ["甘肃开放大学论文 AI 评阅平台", "gsou-thesis-review", "甘肃开放大学"],
];

const mediaDefs: ToolDef[] = [
  ["即梦 AI", "jimeng-ai", "字节跳动", "AI 图像"], ["可灵 AI", "kling-ai", "快手", "AI 视频"], ["通义万相", "tongyi-wanxiang", "阿里巴巴", "AI 图像"],
  ["海螺 AI 视频", "hailuo-video", "MiniMax", "AI 视频"], ["腾讯混元图像", "hunyuan-image", "腾讯", "AI 图像"], ["文心一格", "yige", "百度", "AI 图像"],
  ["美图 AI", "meitu-ai", "美图", "AI 图像"], ["WHEE", "whee", "美图", "AI 图像"], ["剪映 AI", "capcut-ai-cn", "字节跳动", "AI 视频"],
  ["百度 MuseSteamer", "muse-steamer", "百度", "AI 视频"], ["360 AI 生图", "360-ai-image", "360", "AI 图像"], ["稿定 AI", "gaoding-ai", "稿定设计", "AI 图像"],
  ["创客贴 AI", "chuangkit-ai", "创客贴", "AI 图像"], ["LiblibAI", "liblibai", "LiblibAI", "AI 图像"], ["堆友 AI", "d-design-ai", "阿里巴巴", "AI 图像"],
];

const codeDefs: ToolDef[] = [
  ["Trae", "trae", "字节跳动"], ["通义灵码", "tongyi-lingma", "阿里云"], ["CodeGeeX", "codegeex", "智谱 AI"],
  ["Fitten Code", "fitten-code", "非十科技"], ["腾讯 CodeBuddy", "codebuddy", "腾讯云"], ["百度 Comate", "baidu-comate", "百度"],
  ["华为 CodeArts Snap", "codearts-snap", "华为云"], ["MiniMax Code", "minimax-code", "MiniMax"], ["Kimi Code", "kimi-code", "月之暗面"],
  ["DeepSeek Coder / DeepSeek API", "deepseek-coder-api", "深度求索"],
];

const featured = new Set(["doubao", "tongyi-qianwen", "kimi", "deepseek", "chatglm", "ernie-bot", "tencent-yuanbao", "iflytek-spark", "dify", "coze", "fastgpt", "jimeng-ai", "kling-ai", "trae", "tongyi-lingma", "ouchn-ai-base", "gsou-thesis-review"]);

const officialUrls: Record<string, string> = {
  doubao: "https://www.doubao.com/", "tongyi-qianwen": "https://www.tongyi.com/", kimi: "https://www.kimi.com/", deepseek: "https://www.deepseek.com/",
  coze: "https://www.coze.cn/", dify: "https://dify.ai/", fastgpt: "https://fastgpt.cn/", trae: "https://www.trae.cn/",
  "metaso": "https://metaso.cn/", "kling-ai": "https://klingai.kuaishou.com/", "modelscope": "https://modelscope.cn/", "maxkb": "https://maxkb.cn/",
  chatglm: "https://chatglm.cn/", "ernie-bot": "https://yiyan.baidu.com/", "tencent-yuanbao": "https://yuanbao.tencent.com/", "iflytek-spark": "https://xinghuo.xfyun.cn/",
  minimax: "https://www.minimaxi.com/", "hailuo-ai": "https://hailuoai.com/", "tiangong-ai": "https://www.tiangong.cn/", "nami-ai": "https://n.cn/",
  "aliyun-bailian": "https://bailian.console.aliyun.com/", "volcengine-ark": "https://www.volcengine.com/product/ark", "baidu-qianfan": "https://qianfan.cloud.baidu.com/", "tencent-hunyuan": "https://hunyuan.tencent.com/",
  "iflytek-open": "https://www.xfyun.cn/", bigmodel: "https://open.bigmodel.cn/", "minimax-open": "https://platform.minimaxi.com/", siliconflow: "https://siliconflow.cn/", dashscope: "https://dashscope.aliyun.com/",
  "tencent-yuanqi": "https://yuanqi.tencent.com/", "n8n-cn": "https://n8n.io/", "dingtalk-ai-assistant": "https://www.dingtalk.com/", "feishu-ai": "https://www.feishu.cn/product/ai",
  "nami-search": "https://n.cn/", "quark-ai": "https://quark.cn/", "tiangong-search": "https://www.tiangong.cn/", "baidu-ai-search": "https://chat.baidu.com/",
  "wps-ai": "https://ai.wps.cn/", "wps-365": "https://365.wps.cn/", "dingtalk-ai": "https://www.dingtalk.com/", "feishu-minutes": "https://www.feishu.cn/product/minutes", "tencent-docs-ai": "https://docs.qq.com/",
  "baidu-wenku-ai": "https://wenku.baidu.com/", iflyrec: "https://www.iflyrec.com/", "processon-ai": "https://www.processon.com/",
  "iflytek-zhiwen": "https://zhiwen.xfyun.cn/", "kimi-deep-research": "https://www.kimi.com/features/deep-research",
  "jimeng-ai": "https://jimeng.jianying.com/", "tongyi-wanxiang": "https://tongyi.aliyun.com/wanxiang/", "hailuo-video": "https://hailuoai.com/video", "hunyuan-image": "https://hunyuan.tencent.com/", yige: "https://yige.baidu.com/", liblibai: "https://www.liblib.art/",
  "tongyi-lingma": "https://lingma.aliyun.com/", codegeex: "https://codegeex.cn/", "fitten-code": "https://code.fittentech.com/", codebuddy: "https://copilot.tencent.com/", "baidu-comate": "https://comate.baidu.com/", "deepseek-coder-api": "https://platform.deepseek.com/",
  "ouchn-ai-base": "https://ai.ouchn.edu.cn/agentcenter", "gsou-thesis-review": "http://43.136.179.58/",
};

const customDescriptions: Record<string, string> = {
  doubao: "字节跳动推出的全能 AI 助手，覆盖对话、搜索、写作、图片与语音。",
  "tongyi-qianwen": "阿里巴巴通义系列 AI 助手，中文能力全面并与阿里云生态深度连接。",
  kimi: "擅长长文阅读、资料整理和深度研究的中文 AI 助手。",
  deepseek: "以推理与编程能力见长、成本优势突出的中文大模型平台。",
  dify: "开源 LLM 应用开发平台，集工作流、知识库、Agent 与模型接入于一体。",
  coze: "面向个人与团队的零代码智能体开发和发布平台。",
  fastgpt: "面向企业知识库问答的开源平台，支持工作流编排与私有化部署。",
  trae: "面向中文开发者的 AI 原生集成开发环境。",
  "jimeng-ai": "面向中文创作者的图片与视频生成平台。",
  "kling-ai": "快手推出的视频生成平台，擅长运动表现和中文创作流程。",
  "ouchn-ai-base": "面向国家开放大学体系的 AI 基座与智能体应用平台，支持智能体创建、知识库和 AI 应用管理。",
  "gsou-thesis-review": "面向高校论文指导与教学管理场景的 AI 辅助评阅平台，支持论文格式检查、内容分析、批注建议和评阅意见生成，帮助教师提升论文评阅效率。",
};

const agentTypes: Record<string, string> = {
  coze: "零代码智能体平台", "tencent-yuanqi": "零代码智能体平台", dify: "工作流 Agent 平台", fastgpt: "企业知识库问答",
  "kimi-agent-swarm": "多智能体", "tiangong-super-agent": "办公 Agent", "nami-multi-agent": "多智能体", "baidu-qianfan-agent": "企业 Agent 平台",
  "dingtalk-ai-assistant": "办公 Agent", "feishu-ai": "企业自动化平台", "coze-space": "通用 Agent", "dify-self-hosted": "开源 Agent 框架",
  "fastgpt-cloud": "知识库问答", "n8n-cn": "企业自动化平台", maxkb: "企业知识库问答", "qianfan-agent-platform": "企业 Agent 平台",
  "coze-dev-platform": "开发者框架", "ouchn-ai-base": "高校智能体平台",
};

function buildTool(def: ToolDef, defaultCategory: string, index: number): CatalogTool {
  const [name, slug, company, overrideCategory] = def;
  const category = overrideCategory || defaultCategory;
  const isAgent = category === "AI Agent" || Boolean(agentTypes[slug]);
  const isApi = category === "API / MaaS" || slug.includes("open") || slug.includes("api");
  const isOpen = category === "开源 / 自部署" || ["dify", "fastgpt", "modelscope", "maxkb", "n8n-cn"].includes(slug);
  const isSearch = category === "AI 搜索" || slug.includes("search") || slug.includes("research");
  const isOffice = category === "AI 办公" || category === "AI 音频";
  const isImage = category === "AI 图像";
  const isVideo = category === "AI 视频";
  const isAssistant = category === "大模型助手";
  const short = customDescriptions[slug] || `${company}推出的${category}产品，面向中文用户提供高效、易用的 AI 能力。`;
  const rating = Math.min(4.9, 4 + ((index * 7) % 9) / 10);
  const recommendation = featured.has(slug) ? 90 + (index % 8) : 76 + ((index * 3) % 14);
  return {
    name, slug, company, country: "中国", officialUrl: officialUrls[slug], category,
    subCategories: isAgent ? ["智能体", isOpen ? "开源" : "工作流"] : isApi ? ["模型 API", "开发平台"] : [category.replace("AI ", ""), isOpen ? "自部署" : "效率工具"],
    shortDescription: short,
    longDescription: `${short} 本站从中文支持、价格模式、核心能力和组织使用风险等维度持续核验。产品功能与价格可能变化，正式采购或部署前请以官网最新说明为准。`,
    domesticAccessibility: "DIRECT",
    pricingModel: isOpen ? "OPEN_SOURCE" : isApi ? "ENTERPRISE" : "FREEMIUM",
    freePlan: !isApi || isOpen,
    freeQuota: isOpen ? "开源版本可免费使用，模型与服务器成本另计" : isApi ? "通常提供新用户试用额度，以控制台为准" : "提供基础免费额度，高级功能或高频使用需付费",
    chineseInterface: true, chineseInputOutput: true,
    supportsFileUpload: isAssistant || isAgent || isOffice,
    supportsWebSearch: isAssistant || isSearch || isAgent,
    supportsImageUnderstanding: isAssistant || isImage,
    supportsImageGeneration: isImage || ["doubao", "tongyi-qianwen", "hunyuan-image"].includes(slug),
    supportsVideoGeneration: isVideo,
    supportsVoiceInput: isAssistant || category === "AI 音频",
    supportsTextToSpeech: isAssistant || category === "AI 音频",
    supportsApi: isApi || isAgent || isOpen,
    supportsAgent: isAgent,
    supportsKnowledgeBase: isAgent || isOpen,
    supportsWorkflow: isAgent || slug === "n8n-cn",
    supportsMcp: isAgent || category === "AI 编程",
    supportsPlugins: isAgent,
    supportsPrivateDeployment: isOpen || isApi,
    supportsLocalDeployment: isOpen,
    useCases: isAgent ? ["搭建智能体", "知识库问答", "业务自动化"] : isSearch ? ["资料检索", "事实核查", "研究综述"] : isOffice ? ["文档写作", "会议纪要", "日常办公"] : isImage || isVideo ? ["内容创作", "营销素材", "视觉设计"] : category === "AI 编程" ? ["代码补全", "项目开发", "代码解释"] : isApi ? ["应用开发", "模型调用", "企业集成"] : ["中文写作", "资料分析", "通用问答"],
    targetUsers: isApi || category === "AI 编程" ? ["开发者", "企业", "政务/高校"] : isOffice ? ["行政办公", "教师", "企业", "政务/高校"] : isImage || isVideo ? ["自媒体", "设计师", "个人用户"] : isSearch || category === "AI 学术" ? ["学生", "教师", "研究人员"] : ["学生", "教师", "个人用户"],
    strengths: ["使用入口清晰", "中文体验完整", isOpen ? "支持自主部署" : "上手门槛较低"],
    weaknesses: ["高级能力可能需要付费", "功能与额度可能随版本调整"],
    bestFor: isAgent ? ["需要搭建可复用 AI 工作流的团队"] : ["希望快速获得中文 AI 能力的用户"],
    notFor: isOpen ? ["缺少部署和运维能力的个人用户"] : ["对数据出境或结果准确性零容忍的场景"],
    complianceNotes: "请勿上传国家秘密、未脱敏个人信息或单位敏感材料；组织采购前应完成数据处理条款与安全能力审查。",
    domesticAlternatives: ["豆包", "通义千问", "DeepSeek"].filter((item) => item !== name).slice(0, 2),
    internationalAlternatives: isAgent ? ["LangChain", "Zapier AI"] : isImage ? ["Midjourney", "Adobe Firefly"] : ["ChatGPT", "Claude"],
    rating, recommendationLevel: recommendation, isFeatured: featured.has(slug), agentType: agentTypes[slug],
  };
}

const groups: Array<[ToolDef[], string]> = [
  [assistantDefs, "大模型助手"], [apiDefs, "API / MaaS"], [agentDefs, "AI Agent"], [searchDefs, "AI 搜索"],
  [officeDefs, "AI 办公"], [mediaDefs, "AI 图像"], [codeDefs, "AI 编程"],
];

const allCatalogTools: CatalogTool[] = groups.flatMap(([defs, category], groupIndex) =>
  defs.map((def, index) => buildTool(def, category, groupIndex * 20 + index)),
);

export const catalogTools: CatalogTool[] = allCatalogTools.filter((tool) => selectedToolSlugSet.has(tool.slug)).map((tool) => tool.slug === "gsou-thesis-review" ? {
  ...tool,
  subCategories: ["高校 AI 应用", "论文评阅", "教学科研工具", "Word 批注", "格式检查", "教师助手"],
  longDescription: `${tool.shortDescription} 这是甘肃开放大学相关 AI 应用成果与校内 AI 应用探索平台，可用于毕业论文初稿检查、格式规范检查、论文批注与修改建议、教师辅助评阅、学生修改反馈、教学质量监控和论文过程管理。`,
  useCases: ["毕业论文初稿检查", "论文格式规范检查", "论文批注与修改建议", "教师辅助评阅", "学生论文修改反馈", "教学质量监控", "论文过程管理"],
  targetUsers: ["高校教师", "论文指导教师", "教学管理人员", "学生", "教务人员"],
  strengths: ["贴合高校论文评阅流程", "支持格式检查与 Word 批注", "提供 AI 辅助批改和评阅意见"],
  bestFor: ["高校论文指导、教学管理与毕业论文过程质量提升"],
  supportsFileUpload: true,
  supportsKnowledgeBase: true,
  recommendationLevel: 96,
  rating: 4.8,
  isFeatured: true,
} : tool.slug === "ouchn-ai-base" ? {
  ...tool,
  subCategories: ["高校 AI 平台", "智能体平台", "知识库", "AI 应用管理"],
  longDescription: `${tool.shortDescription} 平台主要入口为智能体中心；登录由国家开放大学统一身份认证页面完成。`,
  useCases: ["智能体创建", "高校知识库", "AI 应用管理", "教学与办公智能体"],
  targetUsers: ["高校教师", "学生", "教学管理人员", "开发者"],
  recommendationLevel: 95,
  isFeatured: true,
} : tool).map((tool) => {
  const matchedTasks = taskRecommendations.filter((task) => task.tools.some((item) => item.slug === tool.slug));
  return {
    ...tool,
    useCases: [...new Set([...matchedTasks.map((task) => task.label), ...tool.useCases])],
    strengths: curatedStrengths[tool.slug] || tool.strengths,
    bestFor: matchedTasks.length ? matchedTasks.map((task) => `${task.label}：${task.description}`) : tool.bestFor,
    isFeatured: true,
  };
}).sort(compareNationalUsage);

export const featuredTools = catalogTools.filter((tool) => tool.isFeatured).sort(compareNationalUsage);

export const comparisonsSeed = [
  ["豆包 vs 通义千问 vs Kimi", "writing-assistants", ["豆包", "通义千问", "Kimi"], "中文材料写作"],
  ["WPS AI vs 百度文库 AI vs 讯飞智文", "ppt-tools", ["WPS AI", "百度文库 AI", "讯飞智文"], "AI 生成 PPT"],
  ["DeepSeek vs Trae vs 通义灵码", "coding-tools", ["DeepSeek", "Trae", "通义灵码"], "AI 编程"],
  ["扣子 Coze vs Dify vs 国家开放大学 AI 基座平台", "agent-platforms", ["扣子 Coze", "Dify", "国家开放大学 AI 基座平台"], "智能体搭建"],
  ["即梦 AI vs 通义万相 vs LiblibAI", "image-generation", ["即梦 AI", "通义万相", "LiblibAI"], "图片生成"],
  ["即梦 AI vs 可灵 AI vs 海螺 AI 视频", "video-generation", ["即梦 AI", "可灵 AI", "海螺 AI 视频"], "视频生成"],
  ["秘塔 AI 搜索 vs Kimi Deep Research", "ai-search", ["秘塔 AI 搜索", "Kimi Deep Research"], "搜索与研究"],
] as const;

export const useCasesSeed = taskRecommendations.map((task) => ({
  title: task.label, slug: task.slug, scenario: task.label,
  description: task.description,
  recommendedTools: sortByNationalUsage(task.tools).map(({ slug }) => catalogTools.find((tool) => tool.slug === slug)?.name).filter((name): name is string => Boolean(name)),
  freeSolution: "先使用产品免费额度完成小规模验证。", domesticSolution: "优先选择中文体验完整、使用入口清晰并支持本地支付的产品。",
  strongestSolution: "组合专业工具与高能力模型，并保留人工复核环节。", lowCostSolution: "使用开源模型或按量 API，设置预算上限。",
  governmentEducationSolution: "优先选择可签署数据协议、支持私有化或机构采购的国内服务。",
  steps: ["明确输入材料与交付标准", "用 2—3 个候选工具完成样例", "人工核验事实、格式与引用", "固化提示词和工作流程"],
  cautions: ["敏感材料先脱敏", "不要直接采用未经核验的事实和引用", "关注免费额度与商用授权"],
}));

export const newsSeed = [
  ["DeepSeek 推理模型能力更新", "模型更新", ["DeepSeek"]], ["扣子工作流新增企业协作能力", "Agent 新产品", ["扣子 Coze"]],
  ["主流模型 API 价格进入新一轮调整", "价格变化", ["阿里云百炼", "火山方舟", "硅基流动"]], ["可灵 AI 更新视频生成控制能力", "产品更新", ["可灵 AI"]],
  ["Dify 社区版增强知识库检索", "开源动态", ["Dify"]], ["高校 AI 办公工具选型清单更新", "行业观察", ["WPS AI", "通义千问"]],
].map(([title, category, relatedTools], index) => ({
  title: title as string, slug: `intel-${index + 1}`, source: "平台编辑部", summary: `${title}。编辑部正在持续核验功能范围、价格和适用场景。`,
  category: category as string, importanceScore: 5 - (index % 3), relatedTools: relatedTools as string[], publishedAt: new Date(Date.now() - index * 86400000), isPinned: index < 2,
}));

export const rankingSeeds = taskRecommendations.map((task) => [`${task.label}精选榜`, task.slug, task.description] as const);

export const modelSeeds = [
  { name: "DeepSeek R1", provider: "深度求索", modelType: "推理模型", strengths: ["复杂推理", "代码"], weaknesses: ["高峰期可能拥堵"], bestUseCases: ["数学", "编程", "分析"], apiAvailable: true },
  { name: "通义千问 Max", provider: "阿里云", modelType: "通用多模态", strengths: ["中文", "企业生态"], weaknesses: ["版本体系较多"], bestUseCases: ["写作", "办公", "应用开发"], apiAvailable: true },
  { name: "Kimi K2", provider: "月之暗面", modelType: "通用模型", strengths: ["长文本", "工具调用"], weaknesses: ["部分能力需要配额"], bestUseCases: ["研究", "资料分析"], apiAvailable: true },
  { name: "豆包大模型", provider: "字节跳动", modelType: "多模态", strengths: ["性价比", "多模态"], weaknesses: ["企业配置项较多"], bestUseCases: ["内容", "语音", "视觉"], apiAvailable: true },
];
