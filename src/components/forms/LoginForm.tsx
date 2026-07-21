import Button from "../ui/Button/ButtonConfirm";
import Checkbox from "../Checkbox/Checkbox";
import Input from "../ui/Input/Input";
import { Mail, Lock, Eye} from "lucide-react";
import { useBackNavigation } from "@/hooks/useBackNavigation";

export default function LoginForm() {
  const handleBack = useBackNavigation("/painel");
  return (
    <form className="space-y-6">

      <Input
        label="E-mail"
        placeholder="name@company.com"
        leftIcon={<Mail size={18} />}
      />

      <Input
        label="Senha"
        type="password"
        placeholder="••••••••"
        leftIcon={<Lock size={18} />}
        rightIcon={<Eye size={18} />}
      />

      <div className="flex justify-between items-center">

        <Checkbox
          label="Lembrar-me"
        />

        <a
          href="#"
          className="text-blue-800 text-sm"
        >
          Esqueceu sua senha?
        </a>

      </div>

      <Button type="button" onClick={handleBack}>

        Entrar →

      </Button>

    </form>
  );
}