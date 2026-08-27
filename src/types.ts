export type File = {
  key: string;
  slug: string;
  metadata: {
    title: string;
    subtitle: string;
    author: string;
    date: string;
    letter?: string;
  };
  locale: string;
  folder: string;
  content: string;
};
