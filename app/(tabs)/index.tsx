import { Platform } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';


import { HelloWave } from 'components/HelloWave';
import { ThemedText } from 'components/ThemedText';
import { ThemedView } from 'components/ThemedView';

export default function HomeScreen() {
  return (
     <SafeAreaView style={{ flex: 1, paddingHorizontal: 16,backgroundColor: '#ffffff' }}>
      <ThemedView className="flex-row items-center pt-5 space-x-2 pt-5">
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />

      </ThemedView>

    </SafeAreaView>
  );
}
