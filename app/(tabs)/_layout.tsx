import { HapticTab } from 'components/HapticTab';
import { IconSymbol } from 'components/ui/IconSymbol';
import TabBarBackground from 'components/ui/TabBarBackground';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={20} name="house.fill" color={color} />,
        }}
      />
      {/* TODO */}
      {/* <Tabs.Screen
        name="liveprices"
        options={{
          title: 'Liveprices',
          tabBarIcon: ({ color }) => <IconSymbol size={20} name="bitcoinsign.circle" color={color} />,
        }}
      /> */}
      {/* <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={20} name="paperplane.fill" color={color} />,
        }}
      /> */}
    </Tabs>
  );
}