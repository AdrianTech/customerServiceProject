// declare global {
//   // Target the module containing the `ProcessEnv` interface
//   // https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
//   namespace NodeJS {
//     // Merge the existing `ProcessEnv` definition with ours
//     // https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces
//     export interface ProcessEnv {
//       // NODE_ENV: "development" | "production" | "test";
//       // MY_API_KEY: string
//       DB_SETUP?: string;
//       // ...
//     }
//   }
// }
