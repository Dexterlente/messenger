import { Platform } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';


import { ThemedText } from 'components/ThemedText';
import { ThemedView } from 'components/ThemedView';
import { useAxiosConversations } from 'hooks/useFetchConversations';

export default function HomeScreen() {

   const { data, loading, error } = useAxiosConversations({
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDg1NDI0MzIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoiIn0.ybkQr4G8bxWRgsQB8OFWusJsTIcwdL8HxO168ZX53PM',
  });

console.log('Loading:', loading);
console.log('Error:', error);
console.log('Data:', data);



  return (
     <SafeAreaView style={{ flex: 1, paddingHorizontal: 16,backgroundColor: '#ffffff' }}>
      <ThemedView className="flex-row items-center pt-5 space-x-2 pt-5">
        <ThemedText type="title">Welcome!</ThemedText>
{/* TODO */}
      </ThemedView>

    </SafeAreaView>
  );
}
