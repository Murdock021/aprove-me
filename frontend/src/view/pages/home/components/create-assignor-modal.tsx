import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/view/components/ui/dialog';
import { Button } from '@/view/components/ui/button';
import { Input } from '@/view/components/ui/input';
import { Label } from '@/view/components/ui/label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAssignor } from '@/servers/context/ContextProvider';

const AssignorFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres.' })
    .max(140, { message: 'O nome não deve ter mais de 140 caracteres' }),
  phone: z
    .string({ required_error: 'O telefone é obrigatório.' })
    .max(20, { message: 'O Telefone não deve ter mais de 20 caracteres' }),
  email: z
    .string({ required_error: 'O E-mail é obrigatório.' })
    .email({ message: 'O formato de e-mail é inválido' })
    .max(140, { message: 'O E-mail não deve ter mais de 140 caracteres' }),
  document: z
    .string({ required_error: 'O documento é obrigatório.' })
    .max(30, { message: 'O CPF não pode ter mais de 30 caracteres' }),
});

const PayableFormSchema = z.object({
  value: z
    .string()
    .regex(
      /^(\d{1,3}(\.\d{3})*|\d+)(,\d{2})?$/,
      'Valor deve estar no formato válido de moeda (e.g., 1.000,00 ou 1000,00).',
    ),
  issueDate: z.string().nonempty('O campo data é obrigatório.'),
});

type AssignorFormValues = z.infer<typeof AssignorFormSchema>;
type PayableFormValues = z.infer<typeof PayableFormSchema>;

interface CreateAssignorModalContentProps {
  hideCreateAssignor?: boolean;
  assignorId: string; // ID do cedente para criar o pagável
}

export function CreateAssignorModalContent({
  hideCreateAssignor = false,
  assignorId,
}: CreateAssignorModalContentProps) {
  const [formType, setForType] = useState<'assignor' | 'payable'>();
  const [isOpen, setIsOpen] = useState(false);
  const { addAssignor, addPayable } = useAssignor();

  const {
    formState: { errors: assignorErrors },
    handleSubmit: handleAssignorSubmit,
    register: registerAssignor,
  } = useForm<AssignorFormValues>({
    resolver: zodResolver(AssignorFormSchema),
    mode: 'onChange',
  });

  const {
    formState: { errors: payableErrors },
    handleSubmit: handlePayableSubmit,
    register: registerPayable,
  } = useForm<PayableFormValues>({
    resolver: zodResolver(PayableFormSchema),
    mode: 'onChange',
  });

  async function onSubmit(data: AssignorFormValues | PayableFormValues) {
    try {
      if (formType === 'assignor') {
        await addAssignor({
          document: data.document,
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
      } else {
        const emissionDate = new Date(data.issueDate);
        const numericValue = parseFloat(data.value.replace(',', '.'));
        await addPayable({
          assignorId,
          value: numericValue,
          emissionDate,
        });
      }
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex justify-center gap-[20px]">
        {!hideCreateAssignor ? (
          <DialogTrigger
            asChild
            onClick={() => {
              setForType('assignor');
              setIsOpen(true);
            }}
          >
            <Button>Criar Cedente</Button>
          </DialogTrigger>
        ) : (
          <DialogTrigger
            asChild
            onClick={() => {
              setForType('payable');
              setIsOpen(true);
            }}
          >
            <Button>Criar Pagáveis</Button>
          </DialogTrigger>
        )}
      </div>
      <DialogContent>
        <h1>{formType === 'assignor' ? 'Criar Cedente' : 'Criar Pagáveis'}</h1>
        <form
          onSubmit={
            formType === 'assignor'
              ? handleAssignorSubmit(onSubmit)
              : handlePayableSubmit(onSubmit)
          }
        >
          {formType === 'assignor' && (
            <>
              <div>
                <Label>Nome</Label>
                <Input {...registerAssignor('name')} />
                {assignorErrors.name && (
                  <span className="text-red-500">
                    {assignorErrors.name.message}
                  </span>
                )}
              </div>
              <div>
                <Label>Email</Label>
                <Input {...registerAssignor('email')} />
                {assignorErrors.email && (
                  <span className="text-red-500">
                    {assignorErrors.email.message}
                  </span>
                )}
              </div>
              <div>
                <Label>Telefone</Label>
                <Input {...registerAssignor('phone')} />
                {assignorErrors.phone && (
                  <span className="text-red-500">
                    {assignorErrors.phone.message}
                  </span>
                )}
              </div>
              <div>
                <Label>CPF</Label>
                <Input {...registerAssignor('document')} />
                {assignorErrors.document && (
                  <span className="text-red-500">
                    {assignorErrors.document.message}
                  </span>
                )}
              </div>
            </>
          )}

          {formType === 'payable' && (
            <>
              <div>
                <Label>Valor</Label>
                <Input {...registerPayable('value')} type="text" />
                {payableErrors.value && (
                  <span className="text-red-500">
                    {payableErrors.value.message}
                  </span>
                )}
              </div>
              <div>
                <Label>Data de Emissão</Label>
                <Input {...registerPayable('issueDate')} type="date" />
                {payableErrors.issueDate && (
                  <span className="text-red-500">
                    {payableErrors.issueDate.message}
                  </span>
                )}
              </div>
            </>
          )}

          <Button type="submit" variant={'secondary'}>
            {formType === 'assignor' ? 'Criar Cedente' : 'Criar Pagáveis'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
