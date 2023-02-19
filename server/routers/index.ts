import { adminProcedure, t } from "../trpc";
import { userRouter } from "./users";
export const appRouter = t.router({
  sayHi: t.procedure.query(() => {
    return "Hi";
  }),
  logToServer: t.procedure
    .input((value) => {
      //log
      if (typeof value === "string") return value;

      throw new Error("Invalid Input");
    })
    .mutation((req) => {
      console.log(req.input);
      return true;
    }),
  secretData: adminProcedure.query(({ ctx }) => {
    console.log(ctx.user);
    return "Super top admin";
  }),
  users: userRouter,
});

// export const mergedRouter = t.mergeRouters(appRouter, userRouter);
