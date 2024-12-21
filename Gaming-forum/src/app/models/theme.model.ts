import { Post } from './post.model';

export interface Theme {
  id: string;
  userId: string;
  themeName: string;
  description: string;
  createdAt: Date;
  posts?: Post[];
}
