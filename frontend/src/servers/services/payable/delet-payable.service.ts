import { AxiosResponse } from 'axios';
import { CONFIG } from '@/servers/config';
import { apiAuth } from '@/servers/api';

export async function deletePayableService(id: string): Promise<AxiosResponse<void>> {
  const url = `${CONFIG.host}bankme/integrations/payable/${id}`;
  const token = localStorage.getItem('token');
  try {
    const response = await apiAuth.delete<void>(url, {
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
