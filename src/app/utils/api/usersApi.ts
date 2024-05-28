import { AxiosInstance } from 'axios';

export const usersApi = (instance: AxiosInstance) => ({
  async getGoogleLoginLink(): Promise<string>{
    const { data } = await instance.get<null, {data: any}>(
      '/auth/social/google/link',
    );
    return data;
  },
  async getMe(): Promise<any>{
    const { data } = await instance.get<null, {data: any}>(
      '/auth',
    );
    return data;
  },
  async googleLogin(code: string) {
    const { data } = await instance.post<null, {data: any}>(
      `auth/social/google/login?code=${code}`,
    );
    return data;
    
  },
  async createPatient(dto: { email: string, name: string }) {
    const { data } = await instance.post<null, {data: any}>(
      `patient`,
      dto
    );
    return data
  },
  async deletePatient(email: string) {
    const { data } = await instance.delete<null, {data: any}>(
      `patient?email=${email}`,
    );
    return data
  }
});
