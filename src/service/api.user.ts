import axios from 'axios';
import { CreateUserProps } from '../models/user.models';
import { LoginProps } from '../models/login.models';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

interface ApiResponse {
  ok: boolean;
  message: string;
  data?: any;
}

export class ApiServiceUser {
  public static async login(props: LoginProps): Promise<ApiResponse> {
    try {
      const result = await api.post('/user/login', props);
      return result.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  public static async createUser(props: CreateUserProps): Promise<ApiResponse> {
    try {
      const result = await api.post('/user', props);
      return result.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
}
