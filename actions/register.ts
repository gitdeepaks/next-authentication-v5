"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";

import bcrypt from "bcrypt";
import { getUserByEmail } from "@/data/user";

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

  //TODO: Send email for verification

  return { success: "User created" };
};
