import type { Metadata } from "next";
import { LockKeyhole } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export const metadata:Metadata={title:"管理员登录"};
type SearchParams=Promise<Record<string,string|string[]|undefined>>;
export default async function LoginPage({searchParams}:{searchParams:SearchParams}){const params=await searchParams;const error=params.error;const next=typeof params.next==="string"?params.next:"/admin";return <div className="container grid min-h-[70vh] place-items-center py-12"><div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-soft"><Logo/><div className="mt-8"><span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary"><LockKeyhole className="size-5"/></span><h1 className="mt-5 text-2xl font-black">管理员登录</h1><p className="mt-2 text-sm text-muted-foreground">账号和密码由环境变量配置。</p></div>{error&&<div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">账号或密码错误。</div>}<form action="/api/auth/login" method="post" className="mt-6 space-y-4"><input type="hidden" name="next" value={next}/><label><span className="mb-2 block text-xs font-bold text-muted-foreground">邮箱</span><Input name="email" type="email" required autoComplete="username"/></label><label><span className="mb-2 block text-xs font-bold text-muted-foreground">密码</span><Input name="password" type="password" required autoComplete="current-password"/></label><Button className="w-full" size="lg">登录后台</Button></form></div></div>;}
