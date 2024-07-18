/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { cn } from "@/servers/lib/lib";
import { Icons } from "@/view/components/ui/icons";
import { Button } from "@/view/components/ui/button";
import { Input } from "@/view/components/ui/input";
import { Label } from "@/view/components/ui/label";
import { useAuth } from "@/servers/context/AuthContext";
import { useNavigate } from "react-router";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  const handleLogin = async () => {
    try {
      const loginSuccess = await login(username, password);
      if (loginSuccess) {
        navigate("dashboard");
      } else {
        setError("Credenciais inválidas. Tente novamente.");
      }
    } catch (error) {
      setError("Erro ao fazer login. Tente novamente mais tarde.");
    }
  };

  return (
    <div className={cn("grid gap-6 ", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="text-[#A0A0A0]" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="nome@exemplo.com"
              type="email"
              autoCapitalize="none"
              autoComplete="new-password"
              autoCorrect="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="text-[#A0A0A0]" htmlFor="password">
              Senha
            </Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              autoCorrect="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}

            />
          </div>
          <Button
            className="px-2"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Faça login com e-mail
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-[#3e3e3e]" />
        </div>
        { <div className="relative flex justify-center text-xs uppercase">
        </div> }
      </div>
    </div>
  );
}