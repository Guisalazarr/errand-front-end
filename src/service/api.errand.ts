import axios from 'axios';
import {
  CreateErrandProps,
  DeleteErrandProps,
  ListErrandProps,
  SearchErrandProps,
  UpdateErrandProps
} from '../models/errands.models';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});
interface ApiResponse {
  ok: boolean;
  message: string;
  data?: any;
}

export class ApiServiceErrand {
  public static async listErrands(props: ListErrandProps): Promise<ApiResponse> {
    try {
      const result = await api.get(`/user/${props.id}/errand?status=${props.status}`);

      return result.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  public static async searchErrand(props: SearchErrandProps): Promise<ApiResponse> {
    try {
      const result = await api.get(`/user/${props.id}/errand?title=${props.title}`);

      return result.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  public static async createErrand(props: CreateErrandProps): Promise<ApiResponse> {
    try {
      const result = await api.post(`/user/${props.id}/errand`, {
        title: props.title,
        description: props.description
      });
      return result.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  public static async updateErrand(props: UpdateErrandProps): Promise<ApiResponse> {
    try {
      const result = await api.put(`/user/${props.id}/errand/${props.errandId}`, {
        title: props.title,
        description: props.description,
        status: props.status
      });
      console.log(result.data);
      return result.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  public static async deleteErrand(props: DeleteErrandProps): Promise<ApiResponse> {
    try {
      const result = await api.delete(`/user/${props.id}/errand/${props.errandId}`);
      return result.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
}
