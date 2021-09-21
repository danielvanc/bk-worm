import React from "react";
import {
  render as rtlRender,
  screen,
  cleanup,
  act,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import client from "next-auth/client";
import { buildUser } from "./generate";
import * as usersDB from "./data/users";
import Page from "components/Page";
import AppProviders from "context";

import { IRender, IUserProps, IAuthUser } from "interfaces";

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [...screen.queryAllByRole("heading", { name: /Temp book/i })],
    { timeout: 2000 }
  );

async function render(
  ui: React.ReactElement,
  { route = "/", user, books, ...renderOptions }: IRender
) {
  // user = typeof user === "undefined" ? await loginAsUser() : user;
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

async function loginAsUser(userProperties?: IUserProps) {
  const user: IUserProps = buildUser(userProperties);
  await usersDB.create(user);
  const authUser = await usersDB.authenticate(user);

  window.localStorage.setItem(localStorageKey, authUser.token);
  return authUser;
}

async function renderScaffold(user?: IUserProps) {
  if (user === undefined) {
    // First ensure user is shown the 'unauthenticated' screen
    rtlRender(<Page />);
    // const heading = screen.getByRole("heading", {
    //   name: /You are unauthenticated!/i,
    // });
    // expect(heading).toBeInTheDocument();
    // cleanup();

    // Not logged in so thet's get a user
    user = await loginAsUser();
  }

  const route = `/`;

  const mockSession = {
    expires: "1",
    user,
  };

  const mockedClient = client.useSession as jest.Mock;
  mockedClient.mockReturnValueOnce([mockSession, false]);

  let utils: object = {};
  await act(async () => {
    utils = await render(<Page />, { route });
  });

  return {
    ...utils,
    user,
  };
}

let setReturnValue: React.Dispatch<any>;

function useGetBooks() {
  const loadingBooks = [
    {
      id: 0,
      title: "",
      image: "",
      description: "",
      volumeInfo: { title: "Temp book" },
    },
  ];
  const state = React.useState(loadingBooks);
  setReturnValue = state[1];
  return { books: state[0] };
}

export * from "@testing-library/react";

export {
  render,
  rtlRender,
  loginAsUser,
  renderScaffold,
  useGetBooks,
  setReturnValue,
  waitForLoadingToFinish,
  userEvent,
};
