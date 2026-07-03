"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackToToolsLink() {
  const from = useSearchParams().get("from");
  const href = from?.startsWith("/tools") ? from : "/tools";
  return <Link href={href} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" />返回工具库</Link>;
}
