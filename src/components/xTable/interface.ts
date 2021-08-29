import { D2P } from '@/types/common';

interface ColumnShape {
  label: string;
  customHeader?: boolean;
  type?: 'selection' | 'index' | 'expand';
  hidden?: boolean;
  disabled?: boolean;
  sortable?: boolean;
  width?: number;
}

// 特殊列，不对应dto中的任何字段
interface ExtraColumn extends ColumnShape {
  id: string; // 唯一标识
  extraCol: true;
}

interface Formatter<T, R> {
  (data: T, row: R, $index: number, arr: R[]): unknown;
}

type TransToFn<T, R> = T extends { type: infer X; payload: infer Y }
  ? (prop: X, formatter: Formatter<Y, R>) => void
  : never;

type BindPropWithFormatter<T extends Record<string, any> = Record<string, never>> = TransToFn<
  D2P<T>,
  T
>;

type CreateColumn<T> = T extends (prop: infer X, formatter: infer Y) => any
  ? { prop: X; formatter?: Y } & ColumnShape
  : never;

/**
 * D2P<T> extends never 判断是为了兼容不传递泛型的情况下也能得到一定的类型提示
 */
export type Column<T extends Record<string, any> = Record<string, never>> = D2P<T> extends never
  ? {
      prop: string;
      formatter?: Formatter<unknown, unknown>;
    } & ColumnShape
  : CreateColumn<BindPropWithFormatter<T>>;

/**
 * XTable的column类型
 */
export type Columns<T extends Record<string, any> = Record<string, never>> = Array<
  Column<T> | ExtraColumn
>;
