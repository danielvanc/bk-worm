import React from "react";
import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { buildUser } from "./generate";
import * as usersDB from "../test-utils/data/users";
import AppProviders from "context";

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [...screen.queryAllByRole("heading", { name: /Temp book/i })],
    { timeout: 2000 }
  );

async function render(ui, { route = "/", user, books, ...renderOptions } = {}) {
  user = typeof user === "undefined" ? await loginAsUser() : user;
  window.history.pushState({}, "Test page", route);

  const returnValue = {
    ...rtlRender(ui, {
      wrapper: AppProviders,
      ...renderOptions,
    }),
    user,
    books,
  };

  // wait for react-query to settle before allowing the test to continue
  // await waitForLoadingToFinish();

  return returnValue;
}
const localStorageKey = "__bkworm_auth_provider_token__";

async function loginAsUser(userProperties) {
  const user = buildUser(userProperties);
  await usersDB.create(user);
  const authUser = await usersDB.authenticate(user);

  window.localStorage.setItem(localStorageKey, authUser.token);
  return authUser;
}

export * from "@testing-library/react";

export { render, rtlRender, loginAsUser, waitForLoadingToFinish, userEvent };
