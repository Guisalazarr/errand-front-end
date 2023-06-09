import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333'
});

interface ApiResponse {
  ok: boolean;
  message: string;
  data?: any;
}

export class ApiServiceErrand {
  public static async listErrands(id: string): Promise<ApiResponse> {
    try {
      const result = await api.get(`/user/${id}/errand`);
      return result.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  public static async createErrand(id: string, title: string, description: string): Promise<ApiResponse> {
    try {
      const result = await api.post(`/user/${id}/errand`, {
        title,
        description
      });
      return result.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  public static async updateErrand(
    id: string,
    errandId: string,
    title: string,
    description: string
  ): Promise<ApiResponse> {
    try {
      const result = await api.put(`/user/${id}/errand/${errandId}`, {
        title,
        description
      });
      return result.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  public static async deleteErrand(id: string, errandId: string): Promise<ApiResponse> {
    try {
      const result = await api.delete(`/user/${id}/errand/${errandId}`);
      return result.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
}
