import { Platform } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView } from 'react-native';

import { ThemedText } from 'components/ThemedText';
import { ThemedView } from 'components/ThemedView';
import { useFetchConversations } from 'hooks/useFetchConversations';

export default function HomeScreen() {

   const { data, loading, error } = useFetchConversations({
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDg1NDI0MzIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoiIn0.ybkQr4G8bxWRgsQB8OFWusJsTIcwdL8HxO168ZX53PM',
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
              User {item.user_id}
            </ThemedText>
            <ThemedText
              type="default"
              numberOfLines={1}
              className="text-gray-600"
            >
              {item.last_message_content}
            </ThemedText>
            <ThemedText
              type="subtitle"
              className="text-xs text-gray-400 mt-1"
            >
              {new Date(item.last_message_at).toLocaleString()}
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
