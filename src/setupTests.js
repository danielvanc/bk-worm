import "@testing-library/jest-dom/extend-expect";
import * as usersDB from "./test-utils/data/users";
import { server } from "./test-utils/server";

jest.mock("next/dynamic", () => (func) => {
  let component = null;
  func().then((module) => {
    component = module.default;
  });
  const DynamicComponent = (...args) => component(...args);
  DynamicComponent.displayName = "LoadableComponent";
  DynamicComponent.preload = jest.fn();
  return DynamicComponent;
});

beforeAll(() =>
  server.listen({
    onUnhandledRequest: "error",
    quiet: false,
  })
);
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

// general cleanup
afterEach(async () => {
  await Promise.all([
    // auth.logout(),
    usersDB.reset(),
  ]);
});
