// 获取el-form实例方法的Hook
// TODO: 有时间再优化一下获取实例的方法 应该从vm.getInstance中拿到 目前是从模版填入
import { ValidateFieldCallback } from 'element-plus/lib/el-form';
import { ref } from 'vue';

export interface ValidateError {
  message: string;
  field: string;
}

export type ErrorList = ValidateError[];
export interface FieldErrorList {
  [field: string]: ValidateError[];
}

interface Callback {
  (isValid?: boolean, invalidFields?: FieldErrorList): void;
}

interface instanceMethods {
  validate: (callback?: Callback) => Promise<boolean>;
  resetFields: () => void;
  clearValidate: (props?: string | string[]) => void;
  validateField: (props: string | string[], cb: ValidateFieldCallback) => void;
}

export const useElForm = () => {
  const elInstance = ref();
  return <{ value: instanceMethods | undefined }>elInstance;
};
