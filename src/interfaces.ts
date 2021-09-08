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
