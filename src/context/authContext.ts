import { createContext } from "react";
import type { User } from "@/types/user";

export interface AuthContextValue {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
