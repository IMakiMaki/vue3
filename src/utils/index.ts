import { isArray, isUnDef } from './is';

/**
 * 深拷贝
 * @param data
 */
export const deepClone = <T extends unknown>(data: T): T => {
  function clone<S extends unknown>(_data: S): S {
    const type = typeof _data;
    if (type === 'object') {
      if (isArray(_data)) {
        let temp: unknown[] = [];
        for (let index = 0; index < _data.length; index++) {
          temp = [...temp, clone(_data[index])];
        }
        return <S>temp;
      } else {
        let temp = {};
        for (const key in _data) {
          temp = {
            ...temp,
            [key]: clone(_data[key]),
          };
        }
        return <S>temp;
      }
    } else {
      return <S>_data;
    }
  }
  return clone<T>(data);
};
