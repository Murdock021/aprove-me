import { Button } from '@/view/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/view/components/ui/dialog';
import { Input } from '@/view/components/ui/input';
import { Label } from '@/view/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import {
  AssignorProvider,
  useAssignor,
} from '@/servers/context/AssignorContext';

const AssignorFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'O nome deve ter pelo menos 3 caracteres.',
    })
    .max(140, {
      message: 'O nome não deve ter mais de 140 caracteres',
    }),
  phone: z
    .string({
      required_error: 'O telefone é obrigatório.',
    })
    .max(20, {
      message: 'O Telefone não deve ter mais de 20 caracteres',
    }),

  email: z
    .string({
      required_error: ' O E-mail é obrigatório .',
    })
    .email({
      message: 'O formato email é invalido',
    })
    .max(140, {
      message: 'O Email não deve ter mais de 140 caracteres',
    }),
  document: z
    .string({
      required_error: 'O documento é obrigatório.',
    })
    .max(30, {
      message: 'O CPF não pode ter mais de 30 caracteres',
    }),
});

const PayableFormSchema = z.object({
  value: z
    .string()
    .regex(
      /^(\d{1,3}(\.\d{3})*|\d+)(,\d{2})?$/,
      'Valor deve estar no formato válido de moeda (e.g., 1.000,00 ou 1000,00).',
    ),
  issueDate: z.string().nonempty('O Campo dada é obrigatória.'),
});

type AssignorFormValues = z.infer<typeof AssignorFormSchema>;
type PayableFormValues = z.infer<typeof PayableFormSchema>;

export function CreateAssignorModal() {
  return (
    <AssignorProvider>
      <CreateAssignorModalContent />
    </AssignorProvider>
  );
}

export function CreateAssignorModalContent() {
  const [formType, setForType] = useState<'assignor' | 'payable'>();
  const { addAssignor } = useAssignor();
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
    console.log(data);
    try {
      if (formType === 'assignor') {
        const response = await addAssignor({
          document: data.document,
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog>
      <div className="flex justify-center gap-[20px] ">
        <DialogTrigger
          value={'assignor'}
          onClick={() => setForType('assignor')}
        >
          {'Criar Cedente'}
        </DialogTrigger>
        <DialogTrigger value={'payable'} onClick={() => setForType('payable')}>
          {'Criar Pagáveis'}
        </DialogTrigger>
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
                <Input maskType="phone" {...registerAssignor('phone')} />
                {assignorErrors.phone && (
                  <span className="text-red-500">
                    {assignorErrors.phone.message}
                  </span>
                )}
              </div>
              <div>
                <Label>CPF</Label>
                <Input maskType="cpf" {...registerAssignor('document')} />
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
