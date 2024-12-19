export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  avatarUrl: string;
  createdAt: Date;
}

export interface UserForAuth {
  username: string;
  email: string;
  password: string;
  id: string;
}

export interface ProfileDetails {
  username: string;
  email: string;
  avatarUrl: string;
}
