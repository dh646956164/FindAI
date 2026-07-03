import { Badge } from "@/components/ui/badge";

export function PageHeader({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: React.ReactNode }) {
  return <section className="relative overflow-hidden border-b bg-slate-950 text-white"><div className="absolute inset-0 dot-grid opacity-10"/><div className="absolute left-1/2 top-[-220px] size-[520px] -translate-x-1/2 rounded-full bg-indigo-500/25 blur-3xl"/><div className="container relative py-14 text-center"><Badge className="border-white/10 bg-white/10 text-indigo-200">{eyebrow}</Badge><h1 className="mt-5 text-balance text-4xl font-black tracking-tight md:text-5xl">{title}</h1><p className="text-balance mx-auto mt-4 max-w-2xl leading-7 text-slate-400">{description}</p>{children}</div></section>;
}
