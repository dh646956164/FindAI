import { notFound } from "next/navigation";
import { AdminManager } from "@/components/admin/admin-manager";
import { AdminShell } from "@/components/admin/admin-shell";
type Params=Promise<{section:string}>;const names:Record<string,string>={tools:"工具管理",agents:"Agent 专区管理",rankings:"模型榜单管理",comparisons:"对比文章管理","use-cases":"场景推荐管理",news:"AI 情报管理"};
export default async function AdminSectionPage({params}:{params:Params}){const{section}=await params;if(!names[section])notFound();return <AdminShell title={names[section]} description="新增、编辑和维护站点结构化内容。"><AdminManager entity={section}/></AdminShell>;}
