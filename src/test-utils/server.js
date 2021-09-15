import { setupServer } from "msw/node";
import { handlers } from "./server-handlers";

setupServer(...handlers);

const server = setupServer(...handlers);
// server.printHandlers();
export * from "msw";
export { server };
