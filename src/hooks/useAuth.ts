import { AuthContext, type AuthContextValue } from "@/context/authContext";
import { useContext } from "react";

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (ctx === null)
    throw new Error("useAuth must be used within an AuthProvider");

  return ctx;
}
