import Link from "next/link";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() { return <div className="container py-28 text-center"><SearchX className="mx-auto size-14 text-muted-foreground" /><h1 className="mt-6 text-3xl font-black">没有找到这个页面</h1><p className="mt-3 text-muted-foreground">内容可能已调整，返回工具库继续浏览。</p><Button className="mt-7" asChild><Link href="/tools">返回工具库</Link></Button></div>; }
