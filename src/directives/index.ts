import { App } from 'vue';

export const useDirectives = (app: App) => {
  const directives: Array<{ (app: App): void }> = [];
  directives.forEach((directive) => directive(app));
  return app;
};
