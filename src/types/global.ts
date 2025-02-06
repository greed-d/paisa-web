export interface UserType {
  id: number;
  email: string;
  last_login: string | null; // Nullable date field
  username: string;
  first_name: string;
  last_name: string;
}
