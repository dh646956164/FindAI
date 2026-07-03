"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SearchForm({ large = false, defaultValue = "", className }: { large?: boolean; defaultValue?: string; className?: string }) {
  const router = useRouter(); const [query, setQuery] = useState(defaultValue);
  return <form className={cn("relative flex items-center rounded-2xl bg-card shadow-soft", large && "p-2", className)} onSubmit={(event) => { event.preventDefault(); router.push(`/tools${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`); }}>
    <Search className="absolute left-5 size-5 text-muted-foreground" />
    <Input value={query} onChange={(event) => setQuery(event.target.value)} className={cn("border-0 bg-transparent pl-12 pr-28 shadow-none focus:ring-0", large ? "h-14 text-base" : "h-11")} placeholder="搜索工具、任务或能力..." aria-label="搜索 AI 工具" />
    <Button className="absolute right-2" size={large ? "lg" : "default"}>搜索</Button>
  </form>;
}
