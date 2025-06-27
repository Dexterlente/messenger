import { Platform } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView } from 'react-native';

import { ThemedText } from 'components/ThemedText';
import { ThemedView } from 'components/ThemedView';
import { useFetchConversations } from 'hooks/useFetchConversations';
import MessageTime from 'components/utils/MessageTime';


export default function Explore() {
  const jwt_token = process.env.EXPO_PUBLIC_JWT_TOKEN;
   const { data, loading, error } = useFetchConversations({
    token: jwt_token,
  });

console.log('Loading:', loading);
console.log('Error:', error);
console.log('Data:', data);


  return (
     <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#ffffff' }}>
{/* TODO */}
    <ThemedText className="mt-2 px-4">
            "TODO"
    </ThemedText>


    </SafeAreaView>
  );
}
