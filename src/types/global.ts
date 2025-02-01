export interface UserType {
  id: number;
  email: string;
  password: string;
  last_login: string | null; // Nullable date field
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
}
