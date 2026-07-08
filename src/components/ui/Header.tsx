import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  children: React.ReactNode;
  backTo?: string;
}

export default function Header({ children, backTo }: HeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    }
  };

  return (

<header className="absolute top-0 left-0 flex h-16 w-full items-center justify-between bg-white px-10 shadow-sm">

        <div className="flex items-center gap-4">

          <button
            type="button"
            onClick={handleBack}
            disabled={!backTo}
            className="rounded-full p-2 hover:bg-slate-100 disabled:cursor-default disabled:opacity-40"
          >
            <ArrowLeft className="h-5 w-5 text-[#003D9B]" />
          </button>

          <h1 className="text-2xl font-semibold text-[#003D9B]">
            {children}
          </h1>

        </div>

        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0052CC] text-xs font-bold text-[#C4D2FF]">
          JD
        </button>

      </header>
  )
}