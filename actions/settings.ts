"use server";

import * as z from "zod";

import { settingsSchema } from "@/schemas";
import { db } from "@/lib/db";

import { CurrentUser } from "@/lib/auth";
import { getUserByEmail, getUserById } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationMail } from "@/lib/mail";
import bcrypt from "bcryptjs";
import { use } from "react";
export const settings = async (values: z.infer<typeof settingsSchema>) => {
  const user = await CurrentUser();

  if (!user) {
    return {
      error: "You must be logged in to do that",
    };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return {
      error: "User not found",
    };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use" };
    }

    const verificationtoken = await generateVerificationToken(values.email);
    await sendVerificationMail(
      verificationtoken.email,
      verificationtoken.token
    );
    return { success: "Email changed, please verify your new email" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const pwMatch = await bcrypt.compare(values.password, dbUser.password);
    if (!pwMatch) {
      return { error: "Incorrect password" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    },
  });

  return { success: "Settings Updated" };
};
