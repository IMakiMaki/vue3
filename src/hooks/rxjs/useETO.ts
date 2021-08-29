import { Fn } from '@/types/common';
import { tryOnUnmounted } from '@vueuse/core';
import { Observable, Subject } from 'rxjs';

/**
 * Event To Observable
 * Not Earth-Threebody Organization
 * */
export const useETO = <T = any>(options?: any): [Fn, Observable<T>] => {
  const observable = new Subject<T>();
  const eventHandle = (args: T) => {
    observable.next(args);
  };
  tryOnUnmounted(() => {
    observable.complete();
    observable.unsubscribe();
  });
  return [eventHandle, observable];
};
