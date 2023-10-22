import clientSystemApi from '@/services/clientSystemApi';
import { API_CREATE_USER, API_GET_ROLES, API_GET_USERS } from '@/configs/apiPath';
import type { WrapperResponse } from '@/services/commonTypes';

export type UserRequestParams = {
  page?: string | number;
  size?: string | number;
  searchValue?: string;
};

export type RoleResType = {
  roleId: string;
  roleName: string;
  appId: string;
};

export interface UserResType {
  page: number;
  pageSize: number;
  total: number;
  totalPage: number;
  items: Item[];
}

export interface Item {
  createdDate: string;
  updatedDate: string;
  createdBy: string;
  updatedBy: string;
  userId: string;
  name: string;
  password: string;
  email: string;
  address: string;
  site: string;
  phone: string;
}

export type CreateUserBody = {
  name: string;
  userId: string;
  roleId: string;
  email?: string;
  password: string;
  phone?: string;
  site?: string;
  address?: string;
};

export const fetchRoles = (): WrapperResponse<RoleResType[]> => clientSystemApi.get(API_GET_ROLES);

export const fetchUsers = (params: UserRequestParams): WrapperResponse<UserResType> =>
  clientSystemApi.get(API_GET_USERS, {
    params,
  });

export const createUser = (data: CreateUserBody): WrapperResponse<UserResType> =>
  clientSystemApi.post(API_CREATE_USER, data);
