"use client";

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current";
import { CurrentUser } from "@/lib/auth";

const CientPage = () => {
  const user = useCurrentUser();
  return (
    <div>
      <UserInfo user={user} label="📱 Client Component" />
    </div>
  );
};

export default CientPage;
