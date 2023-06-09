import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333'
});

interface ApiResponse {
  ok: boolean;
  message: string;
  data?: any;
}

export class ApiServiceUser {
  public static async login(email: string, password: string): Promise<ApiResponse> {
    try {
      const result = await api.post('/user/login', {
        email,
        password
      });
      return result.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  public static async create(
    name: string,
    email: string,
    password: string,
    repeatPassword: string
  ): Promise<ApiResponse> {
    try {
      const result = await api.post('/user', {
        name,
        email,
        password,
        repeatPassword
      });
      return result.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
}
