export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  themeId: string;
  createdAt: Date;
  updatedAt: Date;
}
