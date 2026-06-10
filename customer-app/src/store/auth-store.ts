import { createStore } from '@/middleware/zustand';

type AuthStateProps = {
  isSignedIn: boolean;
  user: any;
};

type AuthActionProps = {
  setUser: (user: any) => void;
  removeUser: () => void;
};

export type AuthStoreProps = AuthActionProps & AuthStateProps;

export const useAuthStore = createStore<AuthStoreProps>(
  (set) => ({
    isSignedIn: false,
    user: null,
    setUser: (payload) =>
      set((state) => {
        return {
          isSignedIn: true,
          user: payload,
        };
      }),
    removeUser: () =>
      set((state) => {
        return {
          isSignedIn: false,
          user: null,
        };
      }),
  }),
  {
    name: 'auth-store',
  },
);
