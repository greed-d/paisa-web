import { UserType } from "@/types/global";

interface LoginStateType {
  isLoggedIn: boolean;
  user: UserType | null;
}
export const loginState: LoginStateType = {
  isLoggedIn: false,
  user: null,
};
