"use client";

import { logout } from "@/actions/logout";
import { space } from "postcss/lib/list";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const logOut = () => {
    logout();
  };

  return (
    <span className="cursor-pointer" onClick={logOut}>
      {children}
    </span>
  );
};
