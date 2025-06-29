import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NavBar = () => {
  const [query, setQuery] = React.useState('');

  return (
    <>
      <View className="flex-row items-center justify-between mb-2 p-3">
        <Text className="text-3xl font-bold text-black text-green-600">lentetalk</Text>
      </View>

      <View className="flex-row items-center bg-gray-100 rounded-full px-4">
        <TextInput
          className="flex-1 text-base text-black"
          placeholder="Search..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
        />
      </View>
    </>
  );
};

export default NavBar;
