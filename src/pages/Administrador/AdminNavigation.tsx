import React from "react";
import { Building2, Users, LogOut } from 'lucide-react';
import type { AdminTab } from "../../types/admin.types";

interface AdminNavigationProps {
    activeTab: AdminTab;
    onTabChange: (tab: AdminTab) => void;
    empresasCount: number;
    usuariosCount: number;
    signOut?: () => void;
    isLoggingOut?: boolean;
}

export const AdminNavigation: React.FC<AdminNavigationProps> = ({
    activeTab,
    onTabChange,
    empresasCount,
    usuariosCount,
    signOut,
    isLoggingOut,
}) => {
    const tabs = [
        { id: 'empresas' as AdminTab, label: 'Empresas', icon: Building2, count: empresasCount },
        { id: 'usuarios' as AdminTab, label: 'Usuários', icon: Users, count: usuariosCount },
    ];
    return (
        <nav className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2 mb-8 flex flex-col items-center md:flex-row justify-between">
            <div className="flex items-center justify-between">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 ${isActive
                                    ? 'bg-blue-50 text-[#0052cc]' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                            <Icon className={`w-4 h-4 ${isActive ? 'text-[#0052cc]' : 'text-slate-400'}`} />
                            <span>{tab.label}</span>
                            {tab.count !== undefined && (
                                <span
                                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-[#0052cc] text-white' : 'bg-slate-100 text-slate-600'
                                        }`}
                                >
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            <button
                onClick={signOut}
                disabled={isLoggingOut}
                title="Encerrar sessão"
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors mr-2"
            >
                <LogOut className="w-4 h-4 text-rose-600"
                size={16}
                />
                <span>{isLoggingOut ? "Saindo..." : "Sair"}</span>
            </button>
        </nav>
    );
};