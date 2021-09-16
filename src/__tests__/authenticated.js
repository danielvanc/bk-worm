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
import BookList from "components/BookList";
import { useBookList } from "../utils/books";

// TODO: Convert to TypeScript

jest.mock("next-auth/client");
jest.mock("../utils/books");

const fakeBooksData = [
  {
    kind: "books#volume",
    id: "0Vv6DwAAQBAJ",
    etag: "s/2Vdk+XRI8",
    selfLink: "https://www.googleapis.com/books/v1/volumes/0Vv6DwAAQBAJ",
    volumeInfo: {
      title: "The Rust Programming Language (Covers Rust 2018)",
      authors: ["Steve Klabnik", "Carol Nichols"],
      publisher: "No Starch Press",
      publishedDate: "2019-08-06",
      description:
        "The official book on the Rust programming language, written by the Rust development team at the Mozilla Foundation, fully updated for Rust 2018. The Rust Programming Language is the official, definitive guide to Rust, a hugely popular, community-supported programming language. This is the second edition of the improved version of the free online Rust book, so well-loved in the Rust community that it is simply referred to as \"the Book\". Programmers love Rust because it allows them to write powerful code efficiently, without the risk of crashes and errors common in languages like C and C++. This book will show readers how to use Rust's robust type system to keep programs memory-safe and speedy, and make the most of the Cargo package manager that brings the pieces of a program together. The reader will learn all about Rust's ownership rules, which lie at the heart of Rust's reliability and crash-resistant compiling. The Rust Programming Language covers everything from basic concepts like variable bindings, control flow, functions, and error handling, to more advanced topics, such as crates, generics, concurrency, and the nitty gritty of Rust's type system. With improved organization, hands-on features, and a more tutorial-oriented style, this version offers a vast improvement over the original. The second edition also provides an entirely new chapter on macros and an expanded chapter on crates, two key aspects of Rust that make it so popular. Readers will also find extra appendices on Rust development tools and Rust versions.",
      industryIdentifiers: [
        {
          type: "ISBN_13",
          identifier: "9781718500440",
        },
        {
          type: "ISBN_10",
          identifier: "1718500440",
        },
      ],
      readingModes: {
        text: false,
        image: false,
      },
      pageCount: 560,
      printType: "BOOK",
      categories: ["Computers"],
      averageRating: 3,
      ratingsCount: 1,
      maturityRating: "NOT_MATURE",
      allowAnonLogging: false,
      contentVersion: "preview-1.0.0",
      panelizationSummary: {
        containsEpubBubbles: false,
        containsImageBubbles: false,
      },
      imageLinks: {
        smallThumbnail:
          "http://books.google.com/books/content?id=0Vv6DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
        thumbnail:
          "http://books.google.com/books/content?id=0Vv6DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      },
      language: "en",
      previewLink:
        "http://books.google.co.uk/books?id=0Vv6DwAAQBAJ&printsec=frontcover&dq=%22%22&hl=&cd=1&source=gbs_api",
      infoLink:
        "http://books.google.co.uk/books?id=0Vv6DwAAQBAJ&dq=%22%22&hl=&source=gbs_api",
      canonicalVolumeLink:
        "https://books.google.com/books/about/The_Rust_Programming_Language_Covers_Rus.html?hl=&id=0Vv6DwAAQBAJ",
    },
    saleInfo: {
      country: "GB",
      saleability: "NOT_FOR_SALE",
      isEbook: false,
    },
    accessInfo: {
      country: "GB",
      viewability: "PARTIAL",
      embeddable: true,
      publicDomain: false,
      textToSpeechPermission: "ALLOWED",
      epub: {
        isAvailable: false,
      },
      pdf: {
        isAvailable: false,
      },
      webReaderLink:
        "http://play.google.com/books/reader?id=0Vv6DwAAQBAJ&hl=&printsec=frontcover&source=gbs_api",
      accessViewStatus: "SAMPLE",
      quoteSharingAllowed: false,
    },
    searchInfo: {
      textSnippet:
        "This is the second edition of the improved version of the free online Rust book, so well-loved in the Rust community that it is simply referred to as &quot;the Book&quot;.",
    },
  },
];

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

  let utils;
  await act(async () => {
    utils = await render(<Page />, { route });
  });

  return {
    ...utils,
    user,
  };
}

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
  let setReturnValue;

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
