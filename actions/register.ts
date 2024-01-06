"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";

import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";

import { sendVerificationMail } from "@/lib/mail";

export const register = async (value: z.infer<typeof RegisterSchema>) => {
  const validatedFielelds = RegisterSchema.safeParse(value);

  if (!validatedFielelds.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password, name } = validatedFielelds.data;

  const hashPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already exists!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationMail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation Email Sent!" };
};
