// TODO: Add a bit of organisation and seperate into different files

interface DefaultBookFields {
  id: number;
  title: string;
  image: string;
  description: string;
  volumeInfo: {
    title: string;
  };
  isIdle: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

interface BookFields extends DefaultBookFields {
  description: string;
}

interface IAuthUser {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

interface UseAuthProps {
  session: {
    [x: string]: unknown;
    user?: IAuthUser | undefined;
    expires?: string | undefined;
    // TODO: Remove any types and add required types
    signOut?: any;
    signIn?: any;
  };
}

interface IUserProps {
  // [index: number]: number;
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  overrides?: object;
}

interface inputProviderProps {
  props?: React.ReactNode;
  children?: React.ReactNode;
}

interface ClientProps {
  data?: [] | undefined;
  headers?: {
    customHeaders?: Object;
  };
}

interface stateData {
  [data: number]: [];
  items?: [] | null;
}
interface initialStateType {
  status: string;
  data: stateData | undefined;
  error: boolean;
}

interface IRender {
  route?: string;
  user?: any;
  books?: IBooks;
  renderOptions?: object;
}

interface IRequestHandler {
  headers: {
    get: (name: string) => {
      replace: (authType: string, token: string) => string;
    };
  };
}

interface IError extends Error {
  status?: number;
}

// Reusables
type BookList = {
  books?: IBooks | BookPlaceholder;
};

type BookPlaceholder = DefaultBookFields[];

type IBooks = BookFields[];

type Action =
  | { type: "idle"; payload?: boolean; data?: []; error?: boolean }
  | { type: "pending"; payload?: boolean; data?: []; error?: boolean }
  | { type: "resolved"; payload?: boolean; data?: []; error?: boolean }
  | { type: "rejected"; payload?: boolean; data?: []; error?: boolean };
