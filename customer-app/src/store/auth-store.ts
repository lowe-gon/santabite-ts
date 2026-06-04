import { createStore } from '@/middleware/zustand';
import 'immer';

export interface IAuthStoreProps {
  isGuest: boolean;
  onSaveGuest: (value: boolean) => void;
  onRemoveGuest: () => void;
}

export const useAuthStore = createStore<IAuthStoreProps>(
  (set) => ({
    isGuest: false,
    onSaveGuest: (value) =>
      set((state) => ({
        isGuest: value,
      })),
    onRemoveGuest: () =>
      set((state) => ({
        isGuest: false,
      })),
  }),
  {
    name: 'auth-store',
  },
);
