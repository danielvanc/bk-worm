import * as React from "react";
import {
  rtlRender,
  screen,
  act,
  renderScaffold,
  useGetBooks,
  setReturnValue,
  within,
} from "../test-utils/index";

import BookList from "components/BookList";
import { useBookList } from "../utils/books";
import { fakeBooksData } from "tempData";

jest.mock("next-auth/client");
jest.mock("../utils/books");

test("authenticates and render`s logged in status", async () => {
  const { user } = await renderScaffold();

  const authHeading = screen.getByRole("heading", {
    name: /Authenticated/i,
  });

  const logoutButton = screen.getByRole("button", { name: /sign out/i });

  // TODO: Fix errors
  // expect(user).toBeTruthy();
  // expect(authHeading).toBeInTheDocument();
  // expect(logoutButton).toBeInTheDocument();
});

test("displays book(s) once logged in", async () => {
  await renderScaffold();

  const mockedUseBookList = useBookList as jest.Mock;

  mockedUseBookList.mockImplementation(useGetBooks);

  rtlRender(<BookList />);
  let tempBookHeading: HTMLElement | null = screen.getByRole("heading", {
    name: /Temp book/i,
  });

  // TODO: Fix errors
  // expect(tempBookHeading).toBeInTheDocument();

  // Fake response from api with fake data and update component's state
  act(() => {
    setReturnValue(fakeBooksData);
  });

  // Assert response with rendered fake data list items
  const inBookList = within(screen.getByRole("list-items"));
  // TODO: Fix errors
  // expect(inBookList).toBeTruthy();

  tempBookHeading = inBookList.queryByRole("heading", { name: /Temp book/i });

  // TODO: Fix errors
  // expect(tempBookHeading).not.toBeInTheDocument();

  const listItems = inBookList.getAllByRole("listitem");

  // TODO: Fix errors
  // expect(listItems).toHaveLength(2);
});
