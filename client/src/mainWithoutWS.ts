import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";

import { AppRouter } from "../../server/api";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      url: "http://localhost:3000/trpc",
      headers: { Authorization: "TOKEN" },
    }),
  ], //default recommand use
});

async function main() {
  // const result = await client.logToServer.mutate("Hi from client") // 1 -> type error
  // client.sayHi.query();
  // client.sayHi.query();
  // client.sayHi.query();
  // console.log(result)

  const result = await client.secretData.query();

  // const result = await client.users.update.mutate({
  //   userId: "111",
  //   name: "wei",
  // }); // if merge -> client.getUser.query(), not -> client.users.getUser.query();
  console.log(result);
}

main();
