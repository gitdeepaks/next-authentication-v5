"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";

export const register = async (value: z.infer<typeof RegisterSchema>) => {
  const validatedFielelds = RegisterSchema.safeParse(value);

  if (!validatedFielelds.success) {
    return { error: "Invalid fields!" };
  }
  return { success: "Email sent!" };
};
