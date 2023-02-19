import {
  createTRPCProxyClient,
  httpBatchLink,
  loggerLink,
  splitLink,
  wsLink,
  createWSClient,
} from "@trpc/client";

import { AppRouter } from "../../server/api";

const wsClient = createWSClient({
  url: "ws://localhost:3000/trpc",
});

const client = createTRPCProxyClient<AppRouter>({
  links: [
    splitLink({
      condition: (op) => {
        return op.type === "subscription";
      },
      true: wsLink({
        client: wsClient,
      }),
      false: httpBatchLink({
        url: "http://localhost:3000/trpc",
        headers: { Authorization: "TOKEN" },
      }),
    }),

    // httpBatchLink({
    //   url: "http://localhost:3000/trpc",
    //   headers: { Authorization: "TOKEN" },
    // }),
  ], //default recommand use
});

document.addEventListener("click", () => {
  client.users.update.mutate({ userId: "1", name: "Wei" });
});

async function main() {
  client.users.onUpdate.subscribe(undefined, {
    onData: (id) => {
      console.log("Updated", id);
    },
  });
}

main();
