import axios from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import { categoryApi } from './categoryApi';
import { configApi } from './configApi';
import { usersApi } from './usersApi';

export type ApiReturnType = {
  categories: ReturnType<typeof categoryApi>;
  usersApi: ReturnType<typeof usersApi>;
  configApi: ReturnType<typeof configApi>;
};
const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
  const instance = axios.create({
      baseURL: 'http://localhost:3001/',
      headers: {},
      withCredentials: true
    })

  const api = {
    usersApi: usersApi,
  };

  return Object.entries(api).reduce((prev, [key, f]) => ({
    ...prev,
    [key]: f(instance),
  }), {} as ApiReturnType);
};

export default Api;
