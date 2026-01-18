import type { CategoryId } from '../data/types';

export type RootStackParamList = {
  Home: undefined;
  Category: { categoryId: CategoryId };
  ComponentDetail: { componentId: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
