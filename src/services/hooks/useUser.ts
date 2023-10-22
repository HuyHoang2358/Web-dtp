import { useMutation, useQuery } from '@tanstack/vue-query';
import { createUser, fetchRoles, fetchUsers } from '@/services/apis/user';
import type { Ref } from 'vue';

export const USERS_QUERY_KEY = 'USERS_QUERY_KEY';
export const ROLE_QUERY_KEY = 'ROLE_QUERY_KEY';

export const useUsers = (params: {
  currentPage: Ref<number>;
  pageSize: Ref<number>;
  searchValue: Ref<string>;
}) =>
  useQuery({
    queryKey: [USERS_QUERY_KEY, params],
    queryFn: () =>
      fetchUsers({
        page: params.currentPage.value ? (params.currentPage.value - 1)?.toString() : '0',
        size: params?.pageSize.value || '10',
        searchValue: params?.searchValue.value,
      }),
    keepPreviousData: true,
    retry: 2,
  });

export const useRoles = () =>
  useQuery({
    queryKey: [ROLE_QUERY_KEY],
    queryFn: fetchRoles,
    retry: 2,
    refetchOnWindowFocus: false,
  });

export const useAddNewUser = () => useMutation(createUser);
