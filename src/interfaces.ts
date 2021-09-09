export interface DefaultBookFields {
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

export interface BookFields extends DefaultBookFields {
  description: string;
}

export interface UseAuthProps {
  session: {
    [x: string]: unknown;
    user?:
      | {
          name?: string | null | undefined;
          email?: string | null | undefined;
          image?: string | null | undefined;
        }
      | undefined;
    expires?: string | undefined;
    // TODO: Remove any types and add required types
    signOut?: any;
    signIn?: any;
  };
}

export interface inputProviderProps {
  props?: React.ReactNode;
  children?: React.ReactNode;
}

export interface ClientProps {
  data?: [] | undefined;
  headers?: {
    customHeaders?: Object;
  };
}

export interface stateData {
  [data: number]: [];
  items?: [] | null;
}
export interface initialStateType {
  status: string;
  data: stateData | undefined;
  error: boolean;
}
