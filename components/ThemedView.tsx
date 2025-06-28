import { View, type ViewProps } from 'react-native';

import { useThemeColor } from 'components/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

export function ThemedView({ className, style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View className={className} style={[{ backgroundColor }, style]} {...otherProps} />;
}
