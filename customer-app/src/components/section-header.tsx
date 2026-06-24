import { View } from 'react-native';
import ThemedText from './themed-text';

interface SectionHeaderProps {
  title: string;
  description?: string;
}

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <>
      <View className="bg-background px-4 pt-6 pb-2">
        <ThemedText size="title">{title}</ThemedText>
        {description ? (
          <ThemedText
            size="sm"
            variant="muted"
            className="leading-tight font-medium"
            numberOfLines={2}>
            {description}
          </ThemedText>
        ) : null}
      </View>
    </>
  );
}
