import { cn } from '@/libs/cn';
import type React from 'react';
import { Text, type TextProps } from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

const textVariants = tv({
  base: 'font-regular text-text text-sm',
  variants: {
    variant: {
      primary: 'font-medium text-blue-500',
      secondary: 'font-medium text-orange-500',
      link: 'font-medium text-blue-500 underline',
      warning: 'font-medium text-yellow-500',
      error: 'font-medium text-red-500',
      success: 'font-medium text-green-500',
    },
    size: {
      sm: 'text-sm leading-6 font-medium',
      md: 'text-base leading-6 font-semibold',
      lg: 'text-lg leading-6 font-bold',
    },
  },
});

export type ThemedTextProps = TextProps &
  VariantProps<typeof textVariants> &
  React.PropsWithChildren & {};

export default function ThemedText({
  className,
  children,
  size,
  variant,
  ...props
}: ThemedTextProps) {
  return (
    <>
      <Text {...props} className={cn(textVariants({ variant, size }), className)}>
        {children}
      </Text>
    </>
  );
}
