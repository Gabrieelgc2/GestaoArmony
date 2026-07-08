import { Building2, MapPin, Pencil } from "lucide-react";
import type { Project } from "@/types/project";

interface ProjectTableRowProps {
  project: Project;
  showEditAction?: boolean;
  onProjectClick: (project: Project) => void;
  onEditClick?: (project: Project) => void;
}

function StatusBadge({ status }: { status: string }) {
  const isActive = status.toLowerCase().includes("andamento");
  const isReleased = status.toLowerCase().includes("liberado");

  const dotColor = isActive
    ? "bg-blue-500"
    : isReleased
      ? "bg-green-500"
      : "bg-amber-500";

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
      <span className={`h-2 w-2 rounded-full ${dotColor}`} />
      {status}
    </span>
  );
}

export default function ProjectTableRow({
  project,
  showEditAction = false,
  onProjectClick,
  onEditClick,
}: ProjectTableRowProps) {
  return (
    <tr className="border-b border-[#DFE1E6] last:border-b-0 hover:bg-slate-50/80">
      <td className="px-4 py-4">
        <button
          type="button"
          onClick={() => onProjectClick(project)}
          className="flex items-center gap-3 text-left transition hover:opacity-80"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100">
            <Building2 className="h-5 w-5 text-[#003D9B]" />
          </div>
          <span className="font-semibold text-[#191C1E]">{project.name}</span>
        </button>
      </td>

      <td className="hidden px-4 py-4 text-sm text-[#434654] md:table-cell">
        {project.orderNumber}
      </td>

      <td className="hidden px-4 py-4 text-sm text-[#434654] lg:table-cell">
        {project.deadlineDays} dias
      </td>

      <td className="hidden px-4 py-4 lg:table-cell">
        <div className="flex items-start gap-1.5 text-sm text-[#434654]">
          <MapPin size={16} className="mt-0.5 shrink-0 text-[#003D9B]" />
          <span className="line-clamp-2">{project.installationLocation}</span>
        </div>
      </td>

      <td className="px-4 py-4">
        <StatusBadge status={project.status} />
      </td>

      <td className="px-4 py-4">
        <div className="flex items-center justify-end gap-2">
          {showEditAction && onEditClick && (
            <button
              type="button"
              aria-label={`Editar projeto ${project.name}`}
              onClick={() => onEditClick(project)}
              className="rounded-lg p-2 text-[#003D9B] transition hover:bg-blue-50"
            >
              <Pencil size={18} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
