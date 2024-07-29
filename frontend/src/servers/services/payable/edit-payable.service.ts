import { AxiosResponse } from 'axios';
import { CONFIG } from '@/servers/config';
import { apiAuth } from '@/servers/api';
import { PayableResponse } from './created-payable.service';

export interface UpdatePayableRequest {
  id: string;
  value: number;
  emissionDate: string;
  assignorId: number;
}

export async function updatePayableEdit(
  payableData: UpdatePayableRequest,
): Promise<AxiosResponse<PayableResponse>> {
  const url = `${CONFIG.host}bankme/integrations/payable/${payableData.id}`;
  const token = localStorage.getItem('token');
  try {
    const response = await apiAuth.put<PayableResponse>(url, payableData, {
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
