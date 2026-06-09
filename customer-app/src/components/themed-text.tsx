import { cn } from "@/libs/cn";
import type React from "react";
import { Text, type TextProps } from "react-native";
import { tv, type VariantProps } from "tailwind-variants";

const textVariants = tv({
  base: "text-sm font-regular text-text",
  variants: {
    variant: {
      primary: "text-blue-500 font-medium",
      secondary: "text-orange-500 font-medium",
      link: "underline text-blue-500 font-medium",
      warning: "text-yellow-500 font-medium",
      error: "text-red-500 font-medium",
      success: "text-green-500 font-medium",
    },
    size: {
      sm: "text-sm font-medium leading-6",
      md: "text-base font-semibold leading-6",
      lg: "text-lg font-bold leading-6",
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
      <Text
        {...props}
        className={cn(textVariants({ variant, size }), className)}>
        {children}
      </Text>
    </>
  );
}
