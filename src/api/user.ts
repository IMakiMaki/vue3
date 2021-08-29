import { Singleton } from '@/utils/singleton';
import { DtoLogin, DtoLoginSuccess, DtoVerifyCode } from './dto/user.dto';
import { httpObservable } from './request';
import { testData, testDataT } from './test';

const PREFIX = '/user';

class UserServiceClass extends Singleton {
  authImage(data: DtoVerifyCode) {
    return httpObservable<any, ArrayBuffer>({
      url: '/authImage',
      method: 'GET',
      params: data,
      responseType: 'arraybuffer',
    });
  }

  login(data: DtoLogin) {
    return httpObservable<DtoLoginSuccess>({
      url: `${PREFIX}/login`,
      method: 'POST',
      params: { ...data },
    });
  }

  testData(params: any): Promise<testDataT> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('request testData!', 'get params', params);
        // resolve((testData as unknown) as DtoSuccessResponse<testDataT>);
        resolve(testData);
      }, 3000);
    });
  }
}

const UserService = UserServiceClass.getSingletonInstance<UserServiceClass>();

export { UserService };
