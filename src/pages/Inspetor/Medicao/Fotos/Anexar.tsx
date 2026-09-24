import { Paperclip, X } from "lucide-react";

interface Props {
  fotos: File[];
  onFotosChange: (fotos: File[]) => void;
}

export function InputAnexoMedicao({ fotos, onFotosChange }: Props) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;

    onFotosChange([...fotos, ...files]);
  };

  const removerFoto = (index: number) => {
    onFotosChange(fotos.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
            Anexos da Medição (Fotos)
          </h3>
          <p className="text-[11px] text-gray-500">
            Selecione fotos da medição no local para incluir no relatório.
          </p>
        </div>
        <label className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl cursor-pointer transition">
          <Paperclip size={14} /> Selecionar Fotos
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {fotos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {fotos.map((foto, idx) => (
            <div key={idx} className="relative group border border-gray-200 rounded-xl p-2 bg-gray-50 flex items-center justify-between gap-1">
              <span className="text-[10px] text-gray-600 truncate font-medium">
                {foto.name}
              </span>
              <button
                type="button"
                onClick={() => removerFoto(idx)}
                className="text-gray-400 hover:text-rose-600 transition"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}