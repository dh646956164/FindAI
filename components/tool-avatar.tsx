import { cn, initials } from "@/lib/utils";

const gradients = ["from-indigo-500 to-violet-600", "from-cyan-500 to-blue-600", "from-emerald-500 to-teal-600", "from-orange-400 to-rose-500", "from-fuchsia-500 to-purple-600"];
export function ToolAvatar({ name, className }: { name: string; className?: string }) {
  const key = [...name].reduce((sum, char) => sum + (char.codePointAt(0) || 0), 0);
  return <span className={cn("grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-sm font-bold text-white shadow-sm", gradients[key % gradients.length], className)}>{initials(name)}</span>;
}
