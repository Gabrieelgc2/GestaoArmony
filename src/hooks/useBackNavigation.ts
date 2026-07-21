import { useNavigate } from "react-router-dom";

export function useBackNavigation(backTo?: string) {
  const navigate = useNavigate();

  return () => {
    if (backTo) {
      navigate(backTo);
    }
  };
}