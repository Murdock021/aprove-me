import React, { createContext, useContext, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import {
  AssignorRequest,
  AssignorResponse,
  createAssignor,
} from '../services/assignor/created-assignor.service';
import { listAssignors as fetchAssignors } from '../services/assignor/list-assignor.service';

import {
  PayableRequest,
  PayableResponse,
  createPayable,
} from '../services/payable/created-payable.service';
import { listPayables as fetchPayables } from '../services/payable/list-payable.service';

type Assignor = {
  document: string;
  email: string;
  phone: string;
  name: string;
};

type Payable = {
  id: string;
  value: number;
  emissionDate: string;
  assignorId: number;
};

type AssignorContextType = {
  assignor: Assignor | null;
  payable: Payable | null;
  assignors: Assignor[] | null;
  payables: Payable[] | null;
  addAssignor: (assignorData: AssignorRequest) => Promise<boolean>;
  addPayable: (payableData: PayableRequest) => Promise<boolean>;
  listAssignors: () => Promise<Assignor[] | null>;
  listPayables: () => Promise<Payable[] | null>;
  clearAssignor: () => void;
  clearPayable: () => void;
  loading: boolean;
};

const AssignorContext = createContext<AssignorContextType | undefined>(
  undefined,
);

export function AssignorProvider({ children }: { children: React.ReactNode }) {
  const assignorManagement = useProvideAssignor();

  return (
    <AssignorContext.Provider value={assignorManagement}>
      {children}
    </AssignorContext.Provider>
  );
}

export function useAssignor() {
  const context = useContext(AssignorContext);
  if (!context) {
    throw new Error('useAssignor must be used within an AssignorProvider');
  }
  return context;
}

function useProvideAssignor() {
  const [assignor, setAssignor] = useState<Assignor | null>(null);
  const [payable, setPayable] = useState<Payable | null>(null);
  const [assignors, setAssignors] = useState<Assignor[] | null>(null);
  const [payables, setPayables] = useState<Payable[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAssignor = localStorage.getItem('assignor');
    const storedPayable = localStorage.getItem('payable');
    if (storedAssignor) {
      try {
        const parsedAssignor = JSON.parse(storedAssignor);
        setAssignor(parsedAssignor);
      } catch (error) {
        console.error('Error parsing stored assignor:', error);
      }
    }
    if (storedPayable) {
      try {
        const parsedPayable = JSON.parse(storedPayable);
        setPayable(parsedPayable);
      } catch (error) {
        console.error('Error parsing stored payable:', error);
      }
    }
    setLoading(false);
  }, []);

  const addAssignor = async (
    assignorData: AssignorRequest,
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const response: AxiosResponse<AssignorResponse> =
        await createAssignor(assignorData);
      const newAssignor = {
        document: response.data.document,
        email: response.data.email,
        phone: response.data.phone,
        name: response.data.name,
      };
      setAssignor(newAssignor);
      localStorage.setItem('assignor', JSON.stringify(newAssignor));
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      console.error('Failed to register assignor:', error);
      return false;
    }
  };

  const addPayable = async (payableData: PayableRequest): Promise<boolean> => {
    setLoading(true);
    try {
      const response: AxiosResponse<PayableResponse> =
        await createPayable(payableData);
      const newPayable = {
        id: response.data.id,
        value: response.data.value,
        emissionDate: response.data.emissionDate,
        assignorId: response.data.assignorId,
      };
      console.log(response, 'response table');

      setPayable(newPayable);
      localStorage.setItem('payable', JSON.stringify(newPayable));
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      console.error('Failed to register payable:', error);
      return false;
    }
  };

  const listAssignors = async (): Promise<Assignor[] | null> => {
    setLoading(true);
    try {
      const response: AxiosResponse<Assignor[]> = await fetchAssignors();
      setAssignors(response.data);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      console.error('Failed to list assignors:', error);
      return null;
    }
  };

  const listPayables = async (): Promise<Payable[] | null> => {
    setLoading(true);
    try {
      const response: AxiosResponse<Payable[]> = await fetchPayables();
      setPayables(response.data);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      console.error('Failed to list payables:', error);
      return null;
    }
  };

  const clearAssignor = () => {
    localStorage.removeItem('assignor');
    setAssignor(null);
  };

  const clearPayable = () => {
    localStorage.removeItem('payable');
    setPayable(null);
  };

  return {
    assignor,
    payable,
    assignors,
    payables,
    addAssignor,
    addPayable,
    listAssignors,
    listPayables,
    clearAssignor,
    clearPayable,
    loading,
  };
}
