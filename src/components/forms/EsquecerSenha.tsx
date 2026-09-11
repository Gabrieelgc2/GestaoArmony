import { ArrowLeft, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "@/components/ui/Card/Card";

export default function EsquecerSenha() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">Gestão Armony</h1>
          <p className="mt-2 text-slate-500">Suporte para acesso à sua conta</p>
        </div>

        <Card>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Esqueceu sua senha?
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Entre em contato com o suporte por um dos canais abaixo para
                recuperar o acesso.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="mailto:gabrielao8@hotmail.com"
                className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 text-slate-700 transition hover:border-blue-800 hover:text-blue-800"
              >
                <Mail size={20} aria-hidden="true" />
                <span>
                  <strong className="block text-sm">E-mail</strong>
                  <span className="text-sm">gabrielao8@hotmail.com</span>
                </span>
              </a>

              <a
                href="https://wa.me/5581979010538"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 text-slate-700 transition hover:border-green-700 hover:text-green-700"
              >
                <MessageCircle size={20} aria-hidden="true" />
                <span>
                  <strong className="block text-sm">WhatsApp</strong>
                  <span className="text-sm">(81) 97901-0538</span>
                </span>
              </a>
            </div>

            <Link
              to="/"
              className="flex items-center justify-center gap-2 text-sm font-medium text-blue-800 hover:underline"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Voltar para o login
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}