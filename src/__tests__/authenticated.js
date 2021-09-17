import * as React from "react";
import {
  rtlRender,
  screen,
  act,
  renderScaffold,
  useGetBooks,
  setReturnValue,
} from "../test-utils/index";

import BookList from "components/BookList";
import { useBookList } from "../utils/books";
import { fakeBooksData } from "tempData";

// TODO: Convert to TypeScript

jest.mock("next-auth/client");
jest.mock("../utils/books");

test("authenticates and render`s logged in status", async () => {
  const { user } = await renderScaffold();

  const authHeading = screen.getByRole("heading", {
    name: /Authenticated/i,
  });

  expect(user).toBeTruthy();

  expect(authHeading).toBeInTheDocument();
});

test("displays book(s) once logged in", async () => {
  const { debug } = await renderScaffold();

  useBookList.mockImplementation(useGetBooks);

  rtlRender(<BookList />);

  debug();
  // TODO: Add assertion here to test if fake book is rendered

  act(() => {
    setReturnValue(fakeBooksData);
  });

  debug();
  // TODO: Add assertion here for fake book NOT to be in the document
  // TODO: Add assertion here for all books that have loaded
});
