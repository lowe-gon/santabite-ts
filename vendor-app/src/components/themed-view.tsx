import { View, type ViewProps } from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

export const viewVariant = tv({
  base: 'bg-background',
  variants: {
    direction: {
      row: 'flex-row',
      column: 'flex-col',
    },
    spacing: {
      default: 'gap-2',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-10',
    },
  },
  defaultVariants: {
    spacing: 'default',
  },
});

export type TThemedViewProps = ViewProps & VariantProps<typeof viewVariant>;

export default function ThemedView({ direction, spacing, className, ...rest }: TThemedViewProps) {
  return <View className={viewVariant({ direction, spacing, className })} {...rest} />;
}
