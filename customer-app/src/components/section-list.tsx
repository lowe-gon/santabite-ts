import {
  FlashList,
  type FlashListProps,
  type FlashListRef,
  type ListRenderItem,
} from '@shopify/flash-list';
import React from 'react';

export type DataItemProps<ItemT> =
  | {
      type: 'section';
      title: string;
      index: number;
      description?: string;
    }
  | {
      type: 'item';
      index: number;
      sectionIndex: number;
      item: ItemT;
    };

interface BaseSectionProps {
  title: string;
  description?: string;
  index: number;
}

export interface SectionProps<ItemT> extends BaseSectionProps {
  data: ItemT[];
}

interface SectionFlashListProps<ItemT> extends Omit<
  FlashListProps<DataItemProps<ItemT>>,
  'data' | 'renderItem' | 'keyExtractor' | 'stickyHeaderIndices'
> {
  sections: SectionProps<ItemT>[];
  renderItem: (item: ItemT, index: number) => React.ReactElement | null;
  renderSection: (
    section: Omit<BaseSectionProps, 'index'>,
    index: number,
  ) => React.ReactElement | null;

  isSticky?: boolean;
  isStickyFirst?: boolean;
}

function SectionFlashListComponent<ItemT>(
  {
    sections,
    isSticky = false,
    isStickyFirst = false,
    renderItem,
    renderSection,
    ...props
  }: SectionFlashListProps<ItemT>,
  ref: React.ForwardedRef<FlashListRef<DataItemProps<ItemT>>>,
) {
  const flattenedData = React.useMemo(() => {
    return sections.reduce<DataItemProps<ItemT>[]>((acc, { index, title, description, data }) => {
      const sectionHeader: BaseSectionProps = {
        index,
        title,
        description: description ?? '',
      };

      const items: DataItemProps<ItemT>[] = data.map((item, itemIndex) => ({
        type: 'item',
        item: item,
        index: itemIndex,
        sectionIndex: index,
      }));

      return [...acc, { type: 'section', ...sectionHeader }, ...items];
    }, []);
  }, [sections]);

  const stickyHeaderIndices = React.useMemo(
    () =>
      isStickyFirst
        ? [0]
        : isSticky
          ? (flattenedData
              .map((item, index) => (item.type === 'section' ? index : undefined))
              .filter((item) => item !== undefined) as number[])
          : undefined,
    [flattenedData, isSticky],
  );

  const renderItemFn: ListRenderItem<DataItemProps<ItemT>> = ({ item }) => {
    if (item.type === 'section') {
      return renderSection({ title: item.title, description: item.description ?? '' }, item.index);
    }

    if (item.type === 'item') {
      return renderItem(item.item, item.index);
    }

    return null;
  };

  return (
    <FlashList
      ref={ref}
      keyExtractor={(item) =>
        item.type === 'section'
          ? `${item.index}`
          : item.type === 'item'
            ? `${item.sectionIndex}${item.index}`
            : 'unknown'
      }
      data={flattenedData}
      renderItem={renderItemFn}
      stickyHeaderIndices={stickyHeaderIndices}
      {...props}
    />
  );
}

export const SectionFlashList = React.forwardRef(SectionFlashListComponent) as <ItemT>(
  props: SectionFlashListProps<ItemT> & {
    ref?: React.ForwardedRef<FlashListRef<DataItemProps<ItemT>>>;
  },
) => ReturnType<typeof SectionFlashListComponent>;
