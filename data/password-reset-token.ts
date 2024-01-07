import { db } from "@/lib/db";
import email from "next-auth/providers/email";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetTokenEmail = await db.passwordResetToken.findFirst({
      where: { email },
    });

    return passwordResetTokenEmail;
  } catch {
    return null;
  }
};
