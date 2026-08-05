import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  const navigate = useNavigate();
  const { signOut, isLoggingOut } = useAuth();

  return (

<header className="absolute top-0 left-0 flex h-16 w-full items-center justify-between bg-white px-10 shadow-sm">

        <div className="flex items-center gap-4">

          <button
            type="button"
            onClick={()=> navigate(-1)}
            className="rounded-full p-2 hover:bg-slate-100 disabled:cursor-default disabled:opacity-40"
          >
            <ArrowLeft className="h-5 w-5 text-[#003D9B]" />
          </button>

          <h1 className="text-2xl font-semibold text-[#003D9B]">
            {children}
          </h1>

        </div>

          <button
            onClick={signOut}
            disabled={isLoggingOut}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-[#003D9B] disabled:opacity-50"
          >
            <LogOut size={18} />
            <span>{isLoggingOut ? "Saindo..." : "Sair"}</span>

          </button>

      </header>
  )
}