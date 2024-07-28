import { AxiosResponse } from 'axios';
import { CONFIG } from '@/servers/config';
import { apiAuth } from '@/servers/api';

export interface AssignorRequest {
  document: string;
  email: string;
  phone: string;
  name: string;
}

export interface AssignorResponse {
  document: string;
  email: string;
  phone: string;
  name: string;
  id: string;
}

export async function createAssignor(
  assignorData: AssignorRequest,
): Promise<AxiosResponse<AssignorResponse>> {
  const url = `${CONFIG.host}bankme/integrations/assignor`;
  const token = localStorage.getItem('token');
  try {
    const response = await apiAuth.post<AssignorResponse>(url, assignorData, {
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
