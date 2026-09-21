interface GrupoProps {
  titulo: string;
  opcoes: Array<{ valor: string; titulo: string; imagemUrl: string }>;
  valorAtual: string | null;
  onSelect: (valor: string) => void;
}

export function GrupoEspecTecnica({ titulo, opcoes, valorAtual, onSelect }: GrupoProps) {
  return (
    <div>
      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1 block">{titulo}</label>
      <div className="grid grid-cols-2 gap-2">
        {opcoes.map((g) => (
          <button
            type="button"
            key={g.valor}
            onClick={() => onSelect(g.valor)}
            className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition text-left cursor-pointer ${
              valorAtual === g.valor ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <img src={g.imagemUrl} alt={g.titulo} className="h-20 w-full object-contain p-1 rounded-lg bg-gray-50" />
            <span className="text-[11px] font-semibold text-gray-800">{g.titulo}</span>
          </button>
        ))}
      </div>
    </div>
  );
}