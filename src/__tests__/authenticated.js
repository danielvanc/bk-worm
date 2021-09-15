import * as React from "react";
import {
  render,
  rtlRender,
  cleanup,
  screen,
  loginAsUser,
  act,
} from "../test-utils/index";
import client from "next-auth/client";
import Page from "components/Page";

jest.mock("next-auth/client");

async function renderScaffold({ user } = {}) {
  if (user === undefined) {
    // First ensure user is shown the 'unauthenticated' screen
    rtlRender(<Page />);
    const heading = screen.getByRole("heading", {
      name: /You are unauthenticated!/i,
    });
    expect(heading).toBeInTheDocument();
    cleanup();

    // Not logged in so thet's get a user
    user = await loginAsUser();
  }

  const route = `/`;

  const mockSession = {
    expires: "1",
    user,
  };

  client.useSession.mockReturnValueOnce([mockSession, false]);

  const utils = await render(<Page />, { route });

  return {
    ...utils,
    user,
  };
}

test("authenticates and render`s logged in screen", async () => {
  const { debug, user } = await renderScaffold();

  const authHeading = screen.getByRole("heading", {
    name: /Authenticated/i,
  });

  expect(user).toBeTruthy();

  expect(authHeading).toBeInTheDocument();
});

test.todo("displays books once logged in");
