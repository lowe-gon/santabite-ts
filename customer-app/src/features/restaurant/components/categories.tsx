import ThemedText from '@/components/themed-text';
import type { MenuCategory } from '@/data/restaurant';
import React from 'react';
import { Pressable, ScrollView, View, type ScrollViewProps } from 'react-native';

interface CategoryProps extends ScrollViewProps {
  categories: MenuCategory[];
  activeTab: number;
  onTabPress: (index: number) => void;
}

const Categories = React.forwardRef<ScrollView, CategoryProps>(
  ({ activeTab, categories, onTabPress }, ref) => {
    return (
      <>
        <View className="bg-background border-surface w-full border-b">
          <ScrollView
            ref={ref}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}>
            <View className="flex-row items-center">
              {/* Render tabs based directly on your categories length */}
              {categories?.map((cat, idx) => (
                <Pressable
                  key={idx.toString()}
                  className="relative px-6 py-4"
                  onPress={() => onTabPress(idx)}>
                  <ThemedText
                    variant={activeTab === idx ? 'primary' : 'muted'}
                    className="font-semibold">
                    {cat.title} {/* 👈 Dynamically show your actual category title */}
                  </ThemedText>
                  {activeTab === idx && (
                    <View className="absolute right-0 -bottom-0.5 left-0 h-1 rounded-full bg-sky-500" />
                  )}
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
      </>
    );
  },
);

Categories.displayName = 'Categories';

export default Categories;
