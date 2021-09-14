import * as React from "react";
import {
  render,
  rtlRender,
  cleanup,
  screen,
  loginAsUser,
} from "../test-utils/index";
import client from "next-auth/client";
import Home from "../pages/index";

jest.mock("next-auth/client");

async function renderBookScreen({ user } = {}) {
  if (user === undefined) {
    // First ensure user is shown the 'unauthenticated' screen
    rtlRender(<Home />);
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

  const utils = await render(<Home />, { route, user });

  return {
    ...utils,
    user,
  };
}

test("render`s logged in screen", async () => {
  const { debug, user } = await renderBookScreen();

  // Check authenticated screen and elements are showing...
  const discoverHeading = screen.getByRole("heading", {
    name: /Discover new books/i,
  });
  expect(discoverHeading).toBeInTheDocument();

  debug();
  // TODO: Authenticate with provider to display list of books
});
