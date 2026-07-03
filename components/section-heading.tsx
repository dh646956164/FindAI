import { Badge } from "@/components/ui/badge";

export function SectionHeading({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: React.ReactNode }) {
  return <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
    <div>{eyebrow && <Badge className="mb-3">{eyebrow}</Badge>}<h2 className="text-balance text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h2>{description && <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">{description}</p>}</div>
    {action}
  </div>;
}
