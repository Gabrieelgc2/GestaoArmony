interface LupaUsuarioProps {
    lupaUsuario: string;
    setLupaUsuario: (value: string) => void;
}
export function LupaUsuario({lupaUsuario, setLupaUsuario}: LupaUsuarioProps) {
    return (
        <div className="flex flex-col h-full gap-4">
            <div className="relative w-full max-w-sm">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </span>
                <input
                    type="text"
                    value={lupaUsuario}
                    onChange={(e) => setLupaUsuario(e.target.value)}
                    placeholder="Pesquisar por número da obra ou nome do projeto"
                    className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800 placeholder-gray-400 transition"
                />
            </div>
        </div>
    )
}