import { useMemo, useState } from "react";
import Card from "@/components/ui/Card/Card";
import CategoryTabs from "@/components/project-panel/CategoryTabs";
import ProjectMobileCard from "@/components/project-panel/ProjectMobileCard";
import ProjectTableRow from "@/components/project-panel/ProjectTableRow";
import {
  PROJECT_CATEGORY_TABS,
  type Project,
  type ProjectCategory,
} from "@/types/project";

interface ProjectPanelProps {
  projects: Project[];
  showCategories?: boolean;
  showEditAction?: boolean;
  onProjectClick: (project: Project) => void;
  onEditClick?: (project: Project) => void;
}

export default function ProjectPanel({
  projects,
  showCategories = false,
  showEditAction = false,
  onProjectClick,
  onEditClick,
}: ProjectPanelProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("novo");

  const categoryCounts = useMemo(
    () =>
      PROJECT_CATEGORY_TABS.reduce(
        (acc, tab) => ({
          ...acc,
          [tab.id]: projects.filter((project) => project.category === tab.id).length,
        }),
        {} as Record<ProjectCategory, number>
      ),
    [projects]
  );

  const filteredProjects = useMemo(() => {
    if (!showCategories) return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [projects, showCategories, activeCategory]);

  return (
    <div className="space-y-4">
      {showCategories && (
        <CategoryTabs
          tabs={PROJECT_CATEGORY_TABS}
          activeTab={activeCategory}
          onTabChange={setActiveCategory}
          counts={categoryCounts}
        />
      )}

      <Card className="hidden overflow-hidden p-0 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-[#DFE1E6] bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-wide text-[#737685]">
                <th className="px-4 py-3">Nome do projeto</th>
                <th className="hidden px-4 py-3 md:table-cell">Nº do pedido</th>
                <th className="hidden px-4 py-3 lg:table-cell">Prazo acordado</th>
                <th className="hidden px-4 py-3 lg:table-cell">Local de instalação</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>

            <tbody>
              {filteredProjects.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-sm text-[#737685]"
                  >
                    Nenhum projeto encontrado nesta categoria.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <ProjectTableRow
                    key={project.id}
                    project={project}
                    showEditAction={showEditAction}
                    onProjectClick={onProjectClick}
                    onEditClick={onEditClick}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="space-y-3 md:hidden">
        {filteredProjects.length === 0 ? (
          <Card className="py-10 text-center text-sm text-[#737685]">
            Nenhum projeto encontrado nesta categoria.
          </Card>
        ) : (
          filteredProjects.map((project) => (
            <ProjectMobileCard
              key={project.id}
              project={project}
              showEditAction={showEditAction}
              onProjectClick={onProjectClick}
              onEditClick={onEditClick}
            />
          ))
        )}
      </div>
    </div>
  );
}
