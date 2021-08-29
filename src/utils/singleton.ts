/**
 * 单例类
 */
export class Singleton {
  private static _instance: any;
  static getSingletonInstance<T>(...params: unknown[]): T {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const Instance: any = this;
    if (!this._instance) {
      this._instance = new Instance(...params);
    }
    return this._instance;
  }
}
