import { jwtDecode } from 'jwt-decode';

import { SafeAreaView } from 'react-native-safe-area-context';
import { View, FlatList, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import MessageTime, { MessageHourOnly } from 'components/utils/MessageTime';
import { useFetchMessages } from 'hooks/useFetchMessages';
import { useFetchUserById } from 'hooks/useFetchUserById';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';


interface JWTPayload {
    user_id: number;
    username: string;
    exp: number;

}
const screenHeight = Dimensions.get('window').height;
const eightyPercentHeight = screenHeight * 0.8;
const router = useRouter();

export default function Convo() {
const flatListRef = useRef<FlatList>(null);
const [listHeight, setListHeight] = useState(0);
const [contentHeight, setContentHeight] = useState(0);



const { receiver_id } = useLocalSearchParams();
console.log('Receiver ID:', receiver_id);
const parsedId = Number(receiver_id);

const jwt_token = process.env.EXPO_PUBLIC_JWT_TOKEN;
const decoded = jwt_token ? jwtDecode<JWTPayload>(jwt_token) : null;
const myUserId = decoded?.user_id;
console.log('My User ID:', myUserId);

const { user: DataId, loading: LoadingDataId } = useFetchUserById(parsedId);
console.log('User Data:', DataId);

const imageUrl =
DataId && DataId.image_profile?.Valid && DataId.image_profile.String
    ? DataId.image_profile.String
    : '';

const { data, loading, error, fetchMore, hasNextPage, refetch } =
useFetchMessages({
    receiver_id: parsedId,
    token: jwt_token,
}); 

  console.log('Loading:', loading);
  console.log('Error:', error);
  console.log('Data:', data);

useEffect(() => {
  if (flatListRef.current && data.length > 0) {
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    }, 50); // delay ensures layout is finished
  }
}, [data.length]);


const renderItem = ({ item }: { item: any }) => {
    const isSender = item.SenderID === myUserId; // adjust to current user ID if needed

    return (
      <View
        className={`my-2 px-4 py-2 rounded-xl max-w-[80%] ${
          isSender ? 'self-end bg-green-600' : 'self-start bg-gray-300'
        }`}
      >
        <Text className={`${isSender ? 'text-white' : 'text-black'}`}>
          {item.Content}
        </Text>
        <Text className={`text-xs ${isSender ? 'text-white/80' : 'text-gray-600'}`}>
          <MessageTime isoDate={item.SentAt} /> at <MessageHourOnly isoDate={item.SentAt} />
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

      <View className="flex-row items-center px-4 py-3 bg-white"
      >

        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Feather name="arrow-left" size={24} />
        </TouchableOpacity>

      {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            className="w-12 h-12 rounded-full mr-3"
          />
        ) : (
          <View className="w-12 h-12 rounded-full bg-gray-400 justify-center items-center mr-3">
            <Text className="text-white font-bold text-lg">
              {DataId?.first_name?.[0]?.toUpperCase() ?? '?'}
            </Text>
          </View>
        )}

        <View>
          <Text className="text-base font-bold text-gray-900">
            {DataId?.first_name} {DataId?.last_name}
          </Text>
          <Text className="text-sm text-gray-500">@{DataId?.username}</Text>
        </View>
      </View>
     
        <View className='border-b border-gray-300 mb-2'
            style={{
              height: 2,
              backgroundColor: 'transparent',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 4, // Android
            }}
          />

{/* TODO */}
          <FlatList
              ref={flatListRef}
              inverted
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.ID.toString()}
              contentContainerStyle={{
                flexGrow: 1,
                paddingVertical: 8,
                justifyContent: 'flex-end',
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
              onLayout={(e) => setListHeight(e.nativeEvent.layout.height)}
              onContentSizeChange={(_, height) => setContentHeight(height)}
              ListHeaderComponent={
                contentHeight < listHeight ? (
                  <View style={{ height: listHeight - contentHeight }} />
                ) : null
              }
            />
    </SafeAreaView>
  );
}
