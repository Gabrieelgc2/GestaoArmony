import { useState } from "react";
import {
  hasSchedulingErrors,
  validateScheduling,
  type SchedulingErrors,
} from "@/validations/scheduling";

export function useSchedulingForm() {
  const [responsavel, setResponsavel] = useState("");
  const [errors, setErrors] = useState<SchedulingErrors>({
    date: "",
    responsavel: "",
  });

  const validate = (date: Date | undefined): boolean => {
    const validationErrors = validateScheduling({ date, responsavel });
    setErrors(validationErrors);
    return !hasSchedulingErrors(validationErrors);
  };

  return { responsavel, setResponsavel, errors, validate };
}
