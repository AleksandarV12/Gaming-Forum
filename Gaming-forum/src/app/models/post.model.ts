export interface Post {
  _id: string;
  id?: string;
  themeId: string;
  title: string;
  text: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
