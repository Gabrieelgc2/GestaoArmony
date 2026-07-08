import { Building2, MapPin, Pencil } from "lucide-react";
import Card from "@/components/ui/Card/Card";
import type { Project } from "@/types/project";

interface ProjectMobileCardProps {
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
    <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
      <span className={`h-2 w-2 rounded-full ${dotColor}`} />
      {status}
    </span>
  );
}

export default function ProjectMobileCard({
  project,
  showEditAction = false,
  onProjectClick,
  onEditClick,
}: ProjectMobileCardProps) {
  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <button
          type="button"
          onClick={() => onProjectClick(project)}
          className="flex flex-1 items-center gap-3 text-left"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100">
            <Building2 className="h-5 w-5 text-[#003D9B]" />
          </div>

          <div>
            <p className="font-semibold text-[#191C1E]">{project.name}</p>
            <p className="text-sm text-[#737685]">{project.orderNumber}</p>
          </div>
        </button>

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

      <div className="space-y-2 text-sm text-[#434654]">
        <p>
          <span className="font-semibold text-[#737685]">Prazo: </span>
          {project.deadlineDays} dias
        </p>

        <div className="flex items-start gap-1.5">
          <MapPin size={16} className="mt-0.5 shrink-0 text-[#003D9B]" />
          <span>{project.installationLocation}</span>
        </div>
      </div>

      <StatusBadge status={project.status} />
    </Card>
  );
}
