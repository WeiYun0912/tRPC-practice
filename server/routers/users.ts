import { t } from "../trpc";
import { z } from "zod";
import { observable } from "@trpc/server/observable";
import { EventEmitter } from "stream";
// const userProcedure = t.procedure.input((value) => {
//   if (typeof value === "string") return value;

//   throw new Error("Invalid Input");
// });

const userProcedure = t.procedure.input(z.object({ userId: z.string() }));

const eventEmitter = new EventEmitter();

export const userRouter = t.router({
  get: userProcedure.query(({ input }) => {
    return { id: input.userId, name: "weiwei" };
  }),
  update: userProcedure
    .input(z.object({ name: z.string() }))
    .output(z.object({ name: z.string(), id: z.string() }))
    .mutation((req) => {
      console.log(req.ctx);
      console.log("Updateing user", req.input.userId, req.input.name);
      eventEmitter.emit("update", req.input.userId);
      return {
        id: req.input.userId,
        name: req.input.name,
        pas: "1",
        acc: "123",
      };
    }),
  onUpdate: t.procedure.subscription(() => {
    return observable<string>((emit) => {
      eventEmitter.on("update", emit.next);

      return () => {
        eventEmitter.off("update", emit.next);
      };
    });
  }),
});

// export const userRouter = t.router({
//   getUser: t.procedure.query(() => {
//     return { id: 1, name: "weiwei" };
//   }),
// });
