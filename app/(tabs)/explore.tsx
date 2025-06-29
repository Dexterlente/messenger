import { Platform } from 'react-native';
import { jwtDecode } from 'jwt-decode';

import { SafeAreaView } from 'react-native-safe-area-context';
import { View, FlatList, Text, Dimensions } from 'react-native';

import { ThemedText } from 'components/ThemedText';
import { ThemedView } from 'components/ThemedView';
import { useFetchConversations } from 'hooks/useFetchConversations';
import MessageTime from 'components/utils/MessageTime';
import { useFetchMessages } from 'hooks/useFetchMessages';

interface JWTPayload {
    user_id: number;
    username: string;
    exp: number;

}
const screenHeight = Dimensions.get('window').height;
const eightyPercentHeight = screenHeight * 0.8;

export default function Explore() {
  const jwt_token = process.env.EXPO_PUBLIC_JWT_TOKEN;
  const decoded = jwt_token ? jwtDecode<JWTPayload>(jwt_token) : null;
  const myUserId = decoded?.user_id;
  console.log('My User ID:', myUserId);

  const { data, loading, error, fetchMore, hasNextPage, refetch } =
    useFetchMessages({
      receiver_id: 8,
      token: jwt_token,
    });

  console.log('Loading:', loading);
  console.log('Error:', error);
  console.log('Data:', data);


const renderItem = ({ item }: { item: any }) => {
    const isSender = item.SenderID === myUserId; // adjust to current user ID if needed

    return (
      <View
        className={`my-2 px-4 py-2 rounded-xl max-w-[80%] ${
          isSender ? 'self-end bg-blue-500' : 'self-start bg-gray-300'
        }`}
      >
        <Text className={`${isSender ? 'text-white' : 'text-black'}`}>
          {item.Content}
        </Text>
        <Text className={`text-xs ${isSender ? 'text-white/80' : 'text-gray-600'}`}>
          <MessageTime isoDate={item.SentAt} />
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, backgroundColor: '#ffffff' }}>
      {error && (
        <Text className="text-red-500 text-center mt-4">
          {error}
        </Text>
      )}

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.ID.toString()}
        contentContainerStyle={{
          paddingVertical: 16,
          flexGrow: 1,
          minHeight: eightyPercentHeight,
        }}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (!loading && hasNextPage) fetchMore();
        }}
        onEndReachedThreshold={0.3}
        refreshing={loading}
        onRefresh={refetch}
        bounces={true}
        alwaysBounceVertical={true}
      />
    </SafeAreaView>
  );
}
