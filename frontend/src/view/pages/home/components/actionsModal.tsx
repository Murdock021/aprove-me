import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/view/components/ui/dialog';
import { Button } from '@/view/components/ui/button';
import { Input } from '@/view/components/ui/input';
import { Label } from '@/view/components/ui/label';
import { useAssignor } from '@/servers/context/ContextProvider';

export function PayableActionsModal({ payable, onUpdate }) {
  const { updatePayable, deletePayable } = useAssignor();
  const [isOpen, setIsOpen] = useState(false);
  const [editedPayable, setEditedPayable] = useState(payable);

  useEffect(() => {
    if (isOpen && payable) {
      setEditedPayable(payable);
    }
  }, [isOpen, payable]);

  const handleChange = (field, value) => {
    setEditedPayable((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    const numericValue = parseFloat(editedPayable.value.replace(',', '.'));

    const payload = {
      id: editedPayable.id,
      value: numericValue,
      emissionDate: editedPayable.emissionDate,
    };

    try {
      await updatePayable(payload);
      onUpdate(); 
      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar pagável:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePayable(editedPayable.id);
      onUpdate(); 
      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao deletar pagável:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Ações</Button>
      </DialogTrigger>
      <DialogContent>
        {editedPayable && (
          <div className="flex flex-col gap-4">
            <div>
              <Label>ID</Label>
              <Input value={editedPayable.id} disabled />
            </div>
            <div>
              <Label>Valor</Label>
              <Input
                value={editedPayable.value}
                onChange={(e) => handleChange('value', e.target.value)}
              />
            </div>
            <div>
              <Label>Data de Emissão</Label>
              <Input
                type="date"
                value={editedPayable.emissionDate.split('T')[0]}
                onChange={(e) => handleChange('emissionDate', e.target.value)}
              />
            </div>
            <Button onClick={handleSave} variant="secondary">
              Salvar
            </Button>
            <Button onClick={handleDelete} variant="destructive">
              Deletar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
