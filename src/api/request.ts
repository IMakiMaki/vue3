import { storageUtil } from '@/utils/storage';
import axios, {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { from, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DtoSuccessResponse } from './dto/common.dto';

type Before = Parameters<AxiosInterceptorManager<AxiosRequestConfig>['use']>;
type After = Parameters<AxiosInterceptorManager<AxiosResponse<unknown>>['use']>;

const useInterceptors = (
  instance: AxiosInstance,
  interceptors?: {
    before?: Before;
    after?: After;
  }
) => {
  interceptors?.before && instance.interceptors.request.use(...interceptors.before);
  interceptors?.after && instance.interceptors.response.use(...interceptors.after);
  return instance;
};

export const useAxios = ({
  instance,
  interceptors,
}: {
  instance: AxiosInstance;
  interceptors?: {
    before?: Before;
    after?: After;
  };
}) =>
  useInterceptors(instance, {
    before: interceptors?.before,
    after: interceptors?.after,
  });

export const Instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 10000,
});

console.log(import.meta.env.VITE_BASE_API);

const InterceptorInstance = useAxios({
  instance: Instance,
  interceptors: {
    before: [
      (config) => {
        const token = storageUtil.getToken();
        if (token) {
          config.headers.token = `${token}`;
        }
        return config;
      },
      (error) => {
        // do something with request error
        console.log(error); // for debug
        return Promise.reject(error);
      },
    ],
    after: [
      (response) => {
        const { url } = response.config;
        const res = <any>response.data;
        console.group(`%c[${url}]`, 'color:green;');
        console.log(res);
        console.groupEnd();
        // 服务端错误
        if (res.code && res.code !== '2000') {
          // 登录超时
          if (res.code === '4001') {
            // haveWarnedLoginExpired = true;
            // // 重新登录
            // MessageBox.confirm('登录超时，请重新登录', '', {
            //   confirmButtonText: '重新登录',
            //   cancelButtonText: '取消',
            //   type: 'warning',
            // })
            //   .then(() => {
            //     clearStorage();
            //     location.reload();
            //     // console.log('重新登录');
            //   })
            //   .catch(() => {
            //     haveWarnedLoginExpired = false;
            //   });
          }

          // Message({
          //   message: res.message || 'Error',
          //   type: 'error',
          //   duration: 5 * 1000,
          //   showClose: true,
          // });
          return Promise.reject(new Error(res || 'Error'));
        } else {
          return res;
        }
      },
      (error) => {
        return Promise.reject(error);
      },
    ],
  },
});

export const httpObservable = <T = unknown, R = DtoSuccessResponse<T>>(
  params: AxiosRequestConfig,
  instance?: AxiosInstance
): Observable<Error | R> => {
  const ins = instance || InterceptorInstance;
  return from(
    new Promise<R>((resolve, reject) => {
      ins
        .request<T, R>(params)
        .then((res) => {
          resolve(<R>res);
        })
        .catch((err) => {
          if (typeof err.message === 'string') {
            // show message
          }
          reject(err);
        });
    })
  ).pipe(
    catchError((err) => of(new Error(err))),
    tap((err) => {
      if (err instanceof Error) {
        console.warn(err);
      }
    })
  );
};
