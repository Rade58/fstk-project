import { StackClientApp } from "@stackframe/stack";

export const stackClientApp = new StackClientApp({
  // Environment variables are automatically read (but typescript screams at me)
  // this was added in workshop
  tokenStore: "nextjs-cookie", // added this here and it is one of the options
});
