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
  children?: ReactNode;
};

export type AppProvidersProps = {
  children?: ReactNode;
};

export type AuthenticatedProps = {
  children: ReactNode;
};

export type Action =
  | { type: "idle"; payload?: boolean; data?: []; error?: boolean }
  | { type: "pending"; payload?: boolean; data?: []; error?: boolean }
  | { type: "resolved"; payload?: boolean; data?: []; error?: boolean }
  | { type: "rejected"; payload?: boolean; data?: []; error?: boolean };
