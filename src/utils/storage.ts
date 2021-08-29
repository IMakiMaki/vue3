import { DtoLoginSuccess } from '@/api/dto/user.dto';
import { D2P, UnionToIntersection } from '@/types/common';
import { isString } from './is';
import { Singleton } from './singleton';

const PREFIX = 'YIHAO_ADMIN';

interface DATA_TYPE {
  token: string;
  userInfo: DtoLoginSuccess['user'];
  permissions: DtoLoginSuccess['permission'];
}

type SetName<T extends string> = `set${Capitalize<T>}`;
type GetName<T extends string> = `get${Capitalize<T>}`;

type MatchDataType<S extends string, T extends string> = S extends `${T}${infer X}`
  ? `${Uncapitalize<X>}`
  : never;

type SetFunc<T extends { [key: string]: any }> = {
  [Key in SetName<keyof T extends string ? keyof T : never>]: (
    data: T[MatchDataType<Key, 'set'>]
  ) => void;
};

type GetFunc<T extends { [key: string]: any }> = {
  [Key in GetName<keyof T extends string ? keyof T : never>]: () =>
    | T[MatchDataType<Key, 'get'>]
    | null;
};

type setP<T> = T extends { type: infer X; payload: infer Y } ? (type: X, value: Y) => void : never;

type SetF = UnionToIntersection<setP<D2P<DATA_TYPE>>>;

const STORAGE_KEY_MAP = new Map<keyof DATA_TYPE, string>([
  ['token', `${PREFIX}TOKEN`],
  ['userInfo', `${PREFIX}USER_INFO`],
  ['permissions', `${PREFIX}PERMISSIONS`],
]);
class Storage extends Singleton implements SetFunc<DATA_TYPE>, GetFunc<DATA_TYPE> {
  private setLocalStorage: SetF = <T extends keyof DATA_TYPE>(
    type: T,
    value: DATA_TYPE[T],
    storageType?: 'local' | 'session'
  ) => {
    let storageData;
    try {
      storageData = JSON.stringify(value);
    } catch {
      const _data = String(value);
      storageData = _data;
    }
    const storage = storageType === 'session' ? window.sessionStorage : window.localStorage;
    storage.setItem(STORAGE_KEY_MAP.get(type)!, storageData);
  };
  private getLocalStorage<T extends keyof DATA_TYPE>(
    key: T,
    storageType?: 'local' | 'session'
  ): DATA_TYPE[T] | null {
    let storageData;
    const storage = storageType === 'session' ? window.sessionStorage : window.localStorage;
    if (!storage.getItem(key)) {
      return null;
    }
    try {
      storageData = JSON.parse(storage.getItem(key)!);
    } catch {
      storageData = storage.getItem(key);
    }
    return <DATA_TYPE[T]>storageData;
  }
  removeStorage(keys: keyof DATA_TYPE | Array<keyof DATA_TYPE>) {
    if (isString(keys)) {
      window.localStorage.removeItem(keys);
      window.sessionStorage.removeItem(keys);
    } else {
      keys.forEach((key) => {
        window.localStorage.removeItem(key);
        window.sessionStorage.removeItem(key);
      });
    }
  }
  setUserInfo(userInfo: DATA_TYPE['userInfo']) {
    this.setLocalStorage('userInfo', userInfo);
  }
  getUserInfo() {
    return this.getLocalStorage('userInfo');
  }
  setPermissions(permissions: DATA_TYPE['permissions']) {
    this.setLocalStorage('permissions', permissions);
  }
  getPermissions() {
    return this.getLocalStorage('permissions');
  }
  setToken(token: string) {
    this.setLocalStorage('token', token);
  }
  getToken() {
    return this.getLocalStorage('token');
  }
}

export const storageUtil = Storage.getSingletonInstance<Storage>();
