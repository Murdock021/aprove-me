/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { cn } from '@/servers/lib/lib';
import { Icons } from '@/view/components/ui/icons';
import { Button } from '@/view/components/ui/button';
import { Input } from '@/view/components/ui/input';
import { Label } from '@/view/components/ui/label';
import { useAuth } from '@/servers/context/AuthContext';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/view/components/ui/use-toast';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
const loginSchema = z.object({
  login: z.string().nonempty({ message: 'Campo Obrigatório' }),
  password: z.string().nonempty({ message: 'Campo Obrigatório' }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<LoginFormInputs>({ resolver: zodResolver(loginSchema) });

  const handleLogin: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const loginSuccess = await login(data.login, data.password);

      navigate('home');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao realizar login',
      });
    }
  };

  return (
    <div className={cn('grid gap-6 ', className)} {...props}>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="text-[#A0A0A0]" htmlFor="email">
              Usuario
            </Label>
            <Input
              id="login"
              type="text"
              autoCapitalize="none"
              autoComplete="new-password"
              autoCorrect="off"
              disabled={isLoading}
              {...register('login')}
            />
            {errors.login && (
              <span className="text-red-500">{errors.login.message}</span>
            )}
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
              disabled={isLoading}
              {...register('password')}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <Button className="px-2" type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Faça login com usuário
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-[#3e3e3e]" />
        </div>
        {<div className="relative flex justify-center text-xs uppercase"></div>}
      </div>
    </div>
  );
}
