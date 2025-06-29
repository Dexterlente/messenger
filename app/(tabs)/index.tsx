import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Image, Text, View } from 'react-native';

import { ThemedText } from 'components/ThemedText';
import { ThemedView } from 'components/ThemedView';
import { useFetchConversations } from 'hooks/useFetchConversations';
import MessageTime from 'components/utils/MessageTime';
import NavBar from 'components/nav/Navbar';
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const eightyPercentHeight = screenHeight * 0.7;

export default function HomeScreen() {
  const jwt_token = process.env.EXPO_PUBLIC_JWT_TOKEN;

  const {
    data,
    loading,
    error,
    fetchMore,
    hasNextPage,
    page,
    refetch
  } = useFetchConversations({
    token: jwt_token,
  });
  console.log("Data:", data);
  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("Page:", page);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const isLast = index === data.length - 1;

    return (
      <ThemedView
        key={index}
        className={`flex-row items-center bg-gray-100 py-2 ${
          !isLast ? 'border-b-2 border-gray-200' : ''
        }`}
      >
        {item.image_profile?.trim() ? (
          <Image
            source={{ uri: item.image_profile }}
            className="w-14 h-14 rounded-full mr-3"
          />
        ) : (
          <View className="w-14 h-14 rounded-full bg-green-400 items-center justify-center mr-3">
            <Text className="text-white text-lg font-bold">
              {(item.first_name?.[0] ?? '?').toUpperCase()}
            </Text>
          </View>
        )}
        <ThemedView className="flex-1">
          <ThemedText type="defaultSemiBold">
            {item.first_name} {item.last_name}
          </ThemedText>
          <ThemedText
            type="default"
            numberOfLines={1}
            className="text-blue-600"
          >
            {item.last_message_content} ·{' '}
            <MessageTime isoDate={item.last_message_at} />
          </ThemedText>
        </ThemedView>
      </ThemedView>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, backgroundColor: '#ffffff' }}>
      <NavBar />

      <FlatList
        className="mt-2 px-2"
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item.conversation_id?.toString() ?? index.toString()
        }
        ListEmptyComponent={
          !loading ? (
            <ThemedText type="default" className="text-center mt-4">
              No conversations available
            </ThemedText>
          ) : null
        }
        // ListFooterComponent={
        //   loading ? (
        //     <Text className="text-center text-gray-500 my-2">Loading more...</Text>
        //   ) : null
        // }
        onEndReached={() => {
          if (!loading && hasNextPage) fetchMore();
        }}
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
        refreshing={loading}              
        onRefresh={refetch}
        bounces={true}
        alwaysBounceVertical={true}
        overScrollMode="always"
        contentContainerStyle={{
          flexGrow: 1,
          minHeight: eightyPercentHeight,
        }}
            />
    </SafeAreaView>
  );
}
