import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
export function createContext() {
  return {
    isAdmin: true,
  };
}

// export function createContext({ req, res }: CreateExpressContextOptions) {
//   return {
//     req,
//     res,
//     isAdmin: true,
//   };
// }
