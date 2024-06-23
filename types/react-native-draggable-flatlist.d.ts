declare module 'react-native-draggable-flatlist' {
    import { FlatListProps } from 'react-native';
    import { ComponentType } from 'react';
  
    export interface RenderItemInfo<T> {
      item: T;
      index: number;
      drag: () => void;
      isActive: boolean;
    }
  
    export interface DraggableFlatListProps<T> extends FlatListProps<T> {
      data: T[];
      renderItem: (info: RenderItemInfo<T>) => React.ReactElement | null;
      keyExtractor: (item: T, index: number) => string;
      onDragEnd: (info: { data: T[] }) => void;
    }
  
    const DraggableFlatList: <T>(props: DraggableFlatListProps<T>) => React.ReactElement;
  
    export default DraggableFlatList;
  }
  