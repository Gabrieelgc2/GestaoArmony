import {Smile} from 'lucide-react';

export default function AdminHeader() {
    return (
        <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
        Administração
        </h1>
        <div className="flex items-center gap-1.5 mt-1 text-sm font-medium text-slate-500">
        <Smile className="w-4 h-4 text-slate-500" />
        <span>Bem-vindo, Administrador</span>
        </div>
        </header>
    );
};