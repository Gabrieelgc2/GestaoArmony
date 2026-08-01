import StatusButton from "./StatusButton";
import { PROJECT_STATUSES, STATUS_LABELS, type ProjectStatus } from "@/types/project";

interface StatusFilterProps {
  activeStatus: ProjectStatus;
  onChangeStatus: (newStatus: ProjectStatus) => void;
}

export default function StatusFilter({ activeStatus, onChangeStatus }: StatusFilterProps) {
  return (
    <div className="md:flex-row flex flex-col gap-2 overflow-x-auto pb-2 scrollbar-none">
      {PROJECT_STATUSES.map((status) => (
        <StatusButton
          key={status}
          category={status}
          label={STATUS_LABELS[status]}
          activeStatus={activeStatus}
          onClick={() => onChangeStatus(status)}
        />
      ))}
    </div>
  );
}