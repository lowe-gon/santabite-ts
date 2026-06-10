import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import ThemedText from '../themed-text';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot />

      <TabList>
        <TabTrigger name="index" href="/">
          <ThemedText>Home</ThemedText>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}
