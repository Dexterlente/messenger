import { Platform } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView, Image, Text } from 'react-native';

import { ThemedText } from 'components/ThemedText';
import { ThemedView } from 'components/ThemedView';
import { useFetchConversations } from 'hooks/useFetchConversations';
import MessageTime from 'components/utils/MessageTime';


export default function HomeScreen() {
  const jwt_token = process.env.EXPO_PUBLIC_JWT_TOKEN;
   const { data, loading, error } = useFetchConversations({
    token: jwt_token,
  });

console.log('Loading:', loading);
console.log('Error:', error);
console.log('Data:', data);


  return (
     <SafeAreaView style={{ flex: 1, paddingHorizontal: 16,backgroundColor: '#ffffff' }}>
      {data && (
      <ScrollView className="mt-2 px-2">
        {Array.isArray(data.conversations) && data.conversations.length > 0 ? (
          data.conversations.map((item: any, index: number) => (
            <ThemedView
              key={index}
              className="flex-row items-center bg-gray-100 rounded-xl py-3 mb-3"
            >
              {typeof item.image_profile === 'string' && item.image_profile.trim().length > 0 ? (
                <Image
                  source={{ uri: item.image_profile }}
                  className="w-14 h-14 rounded-full mr-3"
                />
              ) : (
                <View className="w-14 h-14 rounded-full bg-green-400 text-white items-center justify-center mr-3">
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
                  {item.last_message_content}{'\u00A0'}· 
                  <MessageTime isoDate={item.last_message_at} />
                </ThemedText>
      
              </ThemedView>
            </ThemedView>
          ))
        ) : (
          <ThemedText type="default">No conversations available</ThemedText>

        )}
      </ScrollView>
    )}
    </SafeAreaView>
  );
}
