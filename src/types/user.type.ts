export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface UsersMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

export interface UsersResponse {
  totalUsers: number;
  metadata: UsersMetadata;
  users: User[];
}