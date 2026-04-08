export type Shelf = {
  id: string;
  name: string;
  isDefault: boolean;
  order: number;
  _count: { entries: number };
};
