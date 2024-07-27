import React, { createContext, useContext, useEffect, useState } from 'react';

import { AxiosResponse } from 'axios';
import {
  AssignorRequest,
  AssignorResponse,
  createAssignor,
} from '../services/created-assignor/created-assignor.service';

type Assignor = {
  document: string;
  email: string;
  phone: string;
  name: string;
};

type AssignorContextType = {
  assignor: Assignor | null;
  addAssignor: (assignorData: AssignorRequest) => Promise<boolean>;
  clearAssignor: () => void;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAssignor = localStorage.getItem('assignor');
    if (storedAssignor) {
      try {
        const parsedAssignor = JSON.parse(storedAssignor);
        setAssignor(parsedAssignor);
      } catch (error) {
        console.error('Error parsing stored assignor:', error);
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

  const clearAssignor = () => {
    localStorage.removeItem('assignor');
    setAssignor(null);
  };

  return {
    assignor,
    addAssignor,
    clearAssignor,
    loading,
  };
}
