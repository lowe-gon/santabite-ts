import { FONTS } from '@/constants/theme';
import { NativeTabs } from 'expo-router/build/native-tabs';

export default function AppTabs() {
  return (
    <NativeTabs
      labelStyle={{
        fontFamily: FONTS.Righteous_Regular,
        fontSize: 11,
      }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="favorite" role="favorites">
        <NativeTabs.Trigger.Badge>9+</NativeTabs.Trigger.Badge>
        <NativeTabs.Trigger.Label>Favorite</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'heart', selected: 'heart.fill' }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="cart">
        <NativeTabs.Trigger.Badge>9+</NativeTabs.Trigger.Badge>
        <NativeTabs.Trigger.Label>Cart</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'cart', selected: 'cart.fill' }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="account">
        <NativeTabs.Trigger.Label>Account</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'person', selected: 'person.fill' }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search" role="search">
        <NativeTabs.Trigger.Label>Search</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="magnifyingglass" md="home" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
