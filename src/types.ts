import { ReactNode } from "react";
import { BookFields, DefaultBookFields } from "interfaces";

// Reusables
export type BookList = {
  books?: IBooks | BookPlaceholder;
};

export type BookPlaceholder = DefaultBookFields[];

export type IBooks = BookFields[];

// Page/Component Props
export type PageProps = {
  title?: string;
  desc?: string;
  children: ReactNode;
};
