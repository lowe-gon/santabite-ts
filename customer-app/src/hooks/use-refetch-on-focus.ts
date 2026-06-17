import { useQueryClient } from '@tanstack/react-query';
import { useFocusEffect } from 'expo-router';
import React from 'react';

type UseRefetchOnFocusProps = {
  queryKeys: string[];
};

export function useRefreshOnFocus({ queryKeys }: UseRefetchOnFocusProps) {
  const queryClient = useQueryClient();
  const firstTimeRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      queryClient.refetchQueries({
        queryKey: queryKeys,
        stale: true,
        type: 'active',
      });
    }, [queryClient]),
  );
}
