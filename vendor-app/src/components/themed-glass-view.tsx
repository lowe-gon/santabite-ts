import {
  GlassContainer,
  GlassView,
  type GlassContainerProps,
  type GlassViewProps,
} from 'expo-glass-effect';
import React from 'react';
import { withUniwind } from 'uniwind';

interface IThemedGlassViewProps extends GlassViewProps {
  children: React.ReactNode;
}

interface IThemedGlassContainerProps extends GlassContainerProps {
  children: React.ReactNode;
}

const ThemedGlassViewBase = withUniwind(GlassView);
const ThemedGlassContainerBase = withUniwind(GlassContainer);

export function ThemedGlassView({ children, ...props }: IThemedGlassViewProps) {
  return <ThemedGlassViewBase {...props}>{children}</ThemedGlassViewBase>;
}

export function ThemedGlassContainer({ children, ...props }: IThemedGlassContainerProps) {
  return <ThemedGlassContainerBase {...props}>{children}</ThemedGlassContainerBase>;
}
