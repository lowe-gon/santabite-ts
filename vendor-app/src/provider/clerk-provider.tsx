import { tokenCache } from '@/utils/token-cache';
import { ClerkProvider as ClerkProviderBase } from '@clerk/expo';

interface IClerkProviderProps {
  children: React.ReactNode;
}

const publishableKey = process.env['EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY']!;

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}

export default function ClerkProvider({ children }: IClerkProviderProps) {
  return (
    <ClerkProviderBase publishableKey={publishableKey} tokenCache={tokenCache}>
      {children}
    </ClerkProviderBase>
  );
}
