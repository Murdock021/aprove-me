import { AxiosResponse } from 'axios';
import { CONFIG } from '@/servers/config';
import { apiAuth } from '@/servers/api';

export interface Assignor {
  document: string;
  email: string;
  phone: string;
  name: string;
  id: string;
}

export async function listAssignors(): Promise<AxiosResponse<Assignor[]>> {
  const url = `${CONFIG.host}bankme/integrations/assignor`;
  const token = localStorage.getItem('token');
  try {
    const response = await apiAuth.get<Assignor[]>(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: unknown) {
    return error;
  }
}
