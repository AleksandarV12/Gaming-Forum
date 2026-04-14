import { Post } from './post.model';

export interface Theme {
  _id: string;
  id?: string;
  userId: string;
  themeName: string;
  description: string;
  createdAt: Date;
  posts?: Post[];
}
