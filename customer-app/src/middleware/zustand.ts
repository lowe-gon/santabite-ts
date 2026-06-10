import { tokenCache } from '@/libs/token-cache';
import { create, type StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist, type PersistOptions } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export function createStore<T>(
  initializer: StateCreator<
    T,
    [['zustand/devtools', never], ['zustand/persist', unknown], ['zustand/immer', never]]
  >,
  { ...persistProps }: PersistOptions<T, T, unknown>,
) {
  return create<T>()(
    devtools(
      persist(immer(initializer), {
        ...persistProps,
        storage: createJSONStorage(() => tokenCache),
      }),
    ),
  );
}
