import "@testing-library/jest-dom/extend-expect";
import * as usersDB from "./test-utils/data/users";
import { server } from "./test-utils/server";

// TODO: Set to correct type
jest.mock("next/dynamic", () => (func: () => Promise<any>) => {
  let component: unknown;
  func().then((module: { default: unknown }) => {
    component = module.default;
  });

  // TODO: Set to correct type
  // @ts-ignore
  const DynamicComponent = (...args: Array<unknown>) => component(...args);
  DynamicComponent.displayName = "LoadableComponent";
  DynamicComponent.preload = jest.fn();
  return DynamicComponent;
});

beforeAll(async () =>
  server.listen({
    onUnhandledRequest: "error",
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
