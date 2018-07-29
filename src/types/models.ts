export interface ITodo {
  completed: boolean;
  id: string;
  title: string;
}

export enum VisibilityFilters {
  SHOW_ALL = 'SHOW_ALL',
  SHOW_ACTIVE = 'SHOW_ACTIVE',
  SHOW_COMPLETED = 'SHOW_COMPLETED',
}
