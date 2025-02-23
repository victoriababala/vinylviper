
import { v } from "convex/values";
import bcrypt from "bcryptjs"; 
import { mutation } from "./_generated/server";

export const signUpUser = mutation({
  args: {
    username: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { username, email, password }) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), email))
      .first();

    if (existingUser) {
      throw new Error("Email already in use");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const userId = await ctx.db.insert("users", {
      username,
      email,
      password_hash: passwordHash,
    });

    return { success: true, userId };
  },
});
