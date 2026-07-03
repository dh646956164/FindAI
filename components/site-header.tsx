"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const staticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
  return <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
    <div className="container flex h-16 items-center justify-between gap-6">
      <Logo />
      <nav className="hidden items-center gap-1 xl:flex">
        {navItems.map(([label, href]) => <Link key={href} href={href} className={cn("rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground", pathname === href && "bg-primary/8 text-primary")}>{label}</Link>)}
      </nav>
      <div className="hidden items-center gap-2 sm:flex">
        <Button variant="ghost" size="icon" asChild><Link href="/tools" aria-label="搜索工具"><Search className="size-4" /></Link></Button>
        {!staticExport && <Button variant="outline" size="sm" asChild><Link href="/admin">管理后台</Link></Button>}
      </div>
      <Button variant="ghost" size="icon" className="xl:hidden" onClick={() => setOpen(!open)} aria-label="切换菜单">{open ? <X /> : <Menu />}</Button>
    </div>
    {open && <nav className="container grid grid-cols-2 gap-2 border-t py-4 xl:hidden">{navItems.map(([label, href]) => <Link onClick={() => setOpen(false)} key={href} href={href} className="rounded-lg bg-muted/60 px-3 py-2 text-sm font-medium">{label}</Link>)}</nav>}
  </header>;
}
