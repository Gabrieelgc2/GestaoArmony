import type { ProjectWorkflow } from "@/types/projectWorkflow";

export const mockWorkflow: ProjectWorkflow[] = [
  {
    projectId: "1",
    measurementDate: new Date("2026-06-01"),
  },
  {
    projectId: "2",
    measurementDate: null,
  },
];