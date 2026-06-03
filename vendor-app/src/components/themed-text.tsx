import { Text, type TextProps } from 'react-native';

import { tv, type VariantProps } from 'tailwind-variants';

export const textVariant = tv({
  base: '',
  variants: {
    variant: {
      success: 'text-green-500',
      warning: 'text-yellow-500',
      error: 'text-red-500',
    },
    color: {
      text: 'text-text-main',
      primary: 'text-primary',
      secondary: 'text-secondary',
      muted: 'text-text-muted',
    },
    size: {
      title: 'text-xl leading-relaxed font-medium',
      subtitle: 'text-base leading-tight font-medium',
      small: 'font-regular text-sm leading-snug',
      smallBold: 'text-sm leading-snug font-semibold',
    },
  },
  defaultVariants: {
    color: 'text',
    size: 'small',
  },
});

export type TThemedTextProps = TextProps & VariantProps<typeof textVariant>;

export default function ThemedText({ color, variant, size, className, ...rest }: TThemedTextProps) {
  return <Text className={textVariant({ variant, size, color, className })} {...rest} />;
}
