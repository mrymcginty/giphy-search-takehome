export interface GiphyProps {
  id: string;
  images: {
    downsized: {
      url: string;
      width: string;
      height: string;
    };
  };
  alt_text: string;
  title: string;
  username: string;
  import_datetime: string;
}

export type GiphyListProps = {
  giphys: GiphyProps[];
};

export type GiphyPageProps = {
  giphy: GiphyProps | undefined;
  isLoading: boolean;
  error: boolean;
};

export interface PaginationHookProps {
  totalCount: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
}

export interface PaginationProps {
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}
