import * as React from 'react';
import InputMask from 'react-input-mask'; // Garanta que este import está correto
import { cn } from '@/servers/lib/lib';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  maskType?: 'phone' | 'cpf';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', maskType, ...otherProps }, ref) => {
    let mask = '';
    switch (maskType) {
      case 'phone':
        mask = '(99) 99999-9999';
        break;
      case 'cpf':
        mask = '999.999.999-99';
        break;
      default:
        break;
    }

    if (mask) {
      return (
        <InputMask
          mask={mask}
          {...otherProps}
          maskPlaceholder={null}
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
        />
      );
    }

    // Input padrão se não houver maskType definido
    return (
      <input
        type={type}
        {...otherProps}
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input };

