/**
 * 由于vue3移除了$on https://v3.vuejs.org/guide/migration/events-api.html#migration-strategy
 * 所以没办法在自定义指令中通过$on监听自定义事件，因此放弃了试图从指令中获取事件将event转成observable的想法
 *  */
export default {};
// import { isString } from '@/utils/is';
// import { isObservable } from 'rxjs';
// import { App, warn } from 'vue';

// Inspired by https://github.com/vuejs/vue-rx/blob/master/src/directives/stream.js
// export const stream = (app: App) => {
//   app.directive('stream', {
//     mounted(el, binding, vNode) {
//       let handle = binding.value;
//       const event = binding.arg;
//       const modifiers = binding.modifiers;

//       console.log(binding, handle, el);
//       const component = binding.instance?.$.subTree.dynamicChildren?.find(
//         (child) => child.el === el
//       );
//       if (!isString(event)) {
//         warn(
//           'Invalid event name in directive v-stream, this directive registered by src/directives/rxjs/index.ts'
//         );
//         return;
//       }
//       if (!isObservable(handle)) {
//         warn(
//           'Invalid Subject found in directive v-stream, this directive registered by src/directives/rxjs/index.ts'
//         );
//         return;
//       } else {
//         handle = { subject: handle };
//       }

//       const modifiersFuncs = {
//         stop: (e: Event) => e.stopPropagation(),
//         prevent: (e: Event) => e.preventDefault(),
//       };

//       const modifiersExists = Object.keys(modifiersFuncs).filter((key) => modifiers[key]);
//       const subject = handle.subject;
//       const next = subject.next.bind(subject);
//       console.log(component, 'dynamicChildren');
//       handle.subject.next('dynamicChildren');
//       console.log(subject);
//       console.log(next);
//       console.log(vNode);
//     },
//   });
//   return app;
// };
