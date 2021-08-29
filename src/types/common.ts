export type Fn = (...args: any) => any;

export type Func<T, R = void> = (data: T) => R;

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

/**
 * 创建 Object中key => value 的对应关系
 */
export type D2P<T extends { [key: string]: any }> = {
  [Key in keyof T]: { type: Key; payload: T[Key] };
}[keyof T];
