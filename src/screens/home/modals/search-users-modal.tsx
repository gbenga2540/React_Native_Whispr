import React, { useState } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import {
  BottomSheetFlatList,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useCustomTheme } from 'src/context/theme/interfaces';
import { Icon, LoadingScreen, Text, UserBox } from 'src/components';
import { fonts } from 'src/assets/fonts/fonts';
import { useGetUsers } from 'src/domain/user';
import { useAuth } from 'src/context/auth/interfaces';

export function SearchUsersModal() {
  const { colors } = useCustomTheme();
  const { auth } = useAuth();

  const [userSearch, setUserSearch] = useState<string>('');
  const { isLoading, data, refetch, isFetching, fetchNextPage } = useGetUsers({
    search: userSearch,
  });
  const usersData: Auth['user'][] =
    (data?.pages || [])
      ?.flatMap(page => page?.data || [])
      ?.flatMap(item => item?.items || []) || [];

  const ICON_STYLE: TextStyle = {
    color: colors.inputPLText,
    marginRight: 10,
  };
  const CONTAINER: ViewStyle = {
    paddingHorizontal: 14,
    flex: 1,
    marginTop: 13,
  };
  const CONTAINER_STYLE: ViewStyle = {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 11,
    backgroundColor: colors.inputBackground,
    minHeight: 45,
    paddingHorizontal: 18,
    marginBottom: 3,
  };
  const TEXT_INPUT_STYLE: TextStyle = {
    flex: 1,
    fontFamily: fonts.primaryFont_400,
    fontSize: 16,
    textAlignVertical: 'center',
    borderWidth: 0,
    color: colors.grayText,
    minHeight: 45,
  };
  const EMPTY_VIEW_CONTAINER_STYLE: ViewStyle = {
    flex: 1,
    paddingTop: 120,
    alignItems: 'center',
  };

  return (
    <BottomSheetView style={CONTAINER}>
      <BottomSheetView style={CONTAINER_STYLE}>
        <Icon name="search" style={ICON_STYLE} />
        <BottomSheetTextInput
          style={TEXT_INPUT_STYLE}
          value={userSearch}
          onChangeText={text => setUserSearch(text)}
          placeholder="Search users..."
        />
      </BottomSheetView>

      {isLoading && usersData?.length === 0 ? (
        <LoadingScreen />
      ) : (
        <BottomSheetFlatList
          data={usersData || []}
          keyExtractor={(item, index) => `${item?.user_id} - ${index}`}
          renderItem={({ item }) => <UserBox user={item} currentUser={auth} />}
          windowSize={8}
          initialNumToRender={8}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={8}
          onRefresh={refetch}
          refreshing={isFetching}
          onEndReachedThreshold={0.5}
          onEndReached={() => fetchNextPage()}
          ListEmptyComponent={
            <BottomSheetView style={EMPTY_VIEW_CONTAINER_STYLE}>
              <Text
                text="No Users Found!"
                fontSize={15}
                color={colors.inputPLText}
              />
            </BottomSheetView>
          }
        />
      )}
    </BottomSheetView>
  );
}
