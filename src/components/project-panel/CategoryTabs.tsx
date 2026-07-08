import { cn } from "@/lib/utils";
import type { ProjectCategory, ProjectCategoryTab } from "@/types/project";

interface CategoryTabsProps {
  tabs: ProjectCategoryTab[];
  activeTab: ProjectCategory;
  onTabChange: (tab: ProjectCategory) => void;
  counts?: Partial<Record<ProjectCategory, number>>;
}

export default function CategoryTabs({
  tabs,
  activeTab,
  onTabChange,
  counts,
}: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 rounded-2xl border border-[#DFE1E6] bg-white p-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "rounded-xl px-4 py-2.5 text-sm font-semibold transition",
            activeTab === tab.id
              ? "bg-[#003D9B] text-white"
              : "text-[#737685] hover:bg-slate-100"
          )}
        >
          {tab.label}
          {counts?.[tab.id] !== undefined && (
            <span
              className={cn(
                "ml-2 rounded-full px-2 py-0.5 text-xs",
                activeTab === tab.id
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-[#737685]"
              )}
            >
              {counts[tab.id]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
