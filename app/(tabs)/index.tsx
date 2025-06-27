import { Platform } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView } from 'react-native';

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
{/* TODO */}
  {data && (
  <ScrollView className="mt-2 px-4">
    {Array.isArray(data.conversations) && data.conversations.length > 0 ? (
      data.conversations.map((item: any, index: number) => (
        <ThemedView
          key={index}
          className="flex-row items-center bg-gray-100 rounded-xl p-3 mb-3"
        >

          <ThemedView className="w-10 h-10 rounded-full bg-blue-600 items-center justify-center mr-3">
            <ThemedText type="defaultSemiBold" style={{ color: 'white' }}>
              {item.user_id.toString().slice(-2)}
            </ThemedText>
          </ThemedView>

          <ThemedView className="flex-1">
            <ThemedText type="defaultSemiBold">
              {item.first_name} {item.last_name}
            </ThemedText>
            <ThemedText
              type="default"
              numberOfLines={1}
              className="text-gray-600"
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
