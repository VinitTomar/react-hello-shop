export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserProfile extends User {
  avatarUrl: string;
  joinedAt: string;
}
