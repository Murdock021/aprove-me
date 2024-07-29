import { AxiosResponse } from 'axios';
import { CONFIG } from '@/servers/config';
import { apiAuth } from '@/servers/api';

export interface Payable {
  id: string;
  value: number;
  emissionDate: string;
  assignorId: number;
}

export interface ListPayablesResponse {
  payables: Payable[];
}

export async function listPayables(): Promise<
  AxiosResponse<ListPayablesResponse>
> {
  const url = `${CONFIG.host}bankme/integrations/payable`;
  const token = localStorage.getItem('token');

  try {
    const response = await apiAuth.get<ListPayablesResponse>(url, {
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
