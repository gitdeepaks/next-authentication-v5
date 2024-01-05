import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validationFields = LoginSchema.safeParse(credentials);

        if (validationFields.success) {
          const { email, password } = validationFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatched = await bcrypt.compare(password, user.password);

          if (!passwordMatched) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
