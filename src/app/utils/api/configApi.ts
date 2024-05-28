import { AxiosInstance } from 'axios';
import { IConfig } from '..';

export const configApi = (instance: AxiosInstance) => ({
  async getConfig() {
    const { data }= await instance.get<null, {data: IConfig}>(
      '/config',
    );
    return data;
  },
  async updateConfig(data: IConfig) {
    console.log('update')
    const { data: responseData } = await instance.post<IConfig, any>(
      '/config',
      data,
    );
    return responseData;
  },
});
