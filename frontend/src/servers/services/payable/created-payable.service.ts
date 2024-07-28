import { AxiosResponse } from 'axios';
import { CONFIG } from '@/servers/config';
import { apiAuth } from '@/servers/api';

export interface PayableRequest {
  value: number;
  emissionDate: string;
  assignorId: number;
}

export interface PayableResponse {
  id: string;
  value: number;
  emissionDate: string;
  assignorId: number;
}

export async function createPayable(
  payableData: PayableRequest,
): Promise<AxiosResponse<PayableResponse>> {
  const url = `${CONFIG.host}bankme/integrations/payable`;
  const token = localStorage.getItem('token');
  try {
    const response = await apiAuth.post<PayableResponse>(url, payableData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}
