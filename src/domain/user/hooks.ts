import { useInfiniteQuery } from 'react-query';
import { getUsers } from './api';
import { GetUsersRequest } from './types';

export function useGetUsers(payload: GetUsersRequest) {
  return useInfiniteQuery(
    ['getUsers', payload.page, payload.search],
    ({ pageParam = 1 }) =>
      getUsers({
        search: payload.search,
        page: pageParam,
        limit: payload.limit || 20,
      }),
    {
      getNextPageParam: (lastPage, _allPages) => {
        const nextPage = lastPage?.data?.page?.next_page;
        return nextPage ? nextPage : undefined;
      },
      refetchIntervalInBackground: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  );
}
