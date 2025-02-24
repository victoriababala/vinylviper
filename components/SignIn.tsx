"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn, headFont } from "@/lib/utils";

export function SignIn() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signUp" | "signIn">("signIn");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("redirectTo", "/");

    const result = await signIn("password", formData);

    if (result.redirect) {
      window.location.href = result.redirect.toString();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900/20 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md "
      >
        <h2  className={cn("text-white text-3xl font-bold text-center mb-6", headFont.className)}>
          {step === "signIn" ? "Welcome Back" : "Create an Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block  text-white text-sm mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <input name="flow" type="hidden" value={step} />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all shadow-md"
          >
            {step === "signIn" ? "Sign In" : "Sign Up"}
          </motion.button>
        </form>

        <button
          type="button"
          onClick={() => setStep(step === "signIn" ? "signUp" : "signIn")}
          className="w-full mt-4 text-center text-gray-400 hover:text-white transition"
        >
          {step === "signIn" ? "New here? Sign up" : "Already have an account? Sign in"}
        </button>
      </motion.div>
    </div>
  );
}
