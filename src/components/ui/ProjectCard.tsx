import { Building2 } from "lucide-react";

interface ProjectCardProps {
  company: string;
  projectId: string;
  status: string;
}

export default function ProjectCard({
  company,
  projectId,
  status,
}: ProjectCardProps) {
  return (
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
          <Building2 className="h-6 w-6 text-primary" />
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-semibold text-foreground">
            {company}
          </h2>

          <p className="text-muted-foreground">
            ID do Projeto:{" "}
            <span className="font-medium">{projectId}</span>
          </p>

          <div className="mt-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              {status}
            </span>
          </div>
        </div>
      </div>
  );
}