import { useInfiniteQuery, useMutation } from 'react-query';
import { createChat, getUserChats } from './api';
import { GetUserChatsRequest } from './types';
import { useChatsStore } from 'src/store/chat/chat.store';
import { IChat } from 'src/interface/chat';

export function useCreateChat() {
  return useMutation(createChat, {
    mutationKey: 'createChat',
  });
}

export function useGetUserChats(payload: GetUserChatsRequest) {
  const { updateChats, isHydrated } = useChatsStore();

  return useInfiniteQuery(
    ['getUserChats', payload.user_id],
    ({ pageParam = 1 }) =>
      getUserChats({
        user_id: payload.user_id,
        page: pageParam,
        limit: payload.limit || 10,
      }),
    {
      getNextPageParam: (lastPage, _allPages) => {
        const nextPage = lastPage?.data?.page?.next_page;
        return nextPage ? nextPage : undefined;
      },
      refetchIntervalInBackground: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      enabled: isHydrated,
      onSuccess: data => {
        const userChatsData: IChat[] =
          (data?.pages || [])
            ?.flatMap(page => page?.data || [])
            ?.flatMap(item => item?.items || []) || [];

        updateChats(userChatsData);
      },
    },
  );
}
