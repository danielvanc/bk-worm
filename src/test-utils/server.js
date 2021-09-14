import { setupWorker } from "msw";
import { handlers } from "./server-handlers";
import { homepage } from "../../package.json";

setupWorker(...handlers);

const fullUrl = new URL("http://localhost:3000");

const server = setupWorker(...handlers);

server.start({
  quiet: true,
  serviceWorker: {
    url: fullUrl.pathname + "mockServiceWorker.js",
  },
});
