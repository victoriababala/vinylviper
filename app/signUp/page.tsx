"use client";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import Link from "next/link";

const SignUpPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const signUpUser = useMutation(api.users.signUpUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.username || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    try {
      await signUpUser({
        username: form.username,
        email: form.email,
        password: form.password,
      });
      alert("Signup successful! 🎉");
      setForm({ username: "", email: "", password: "" });
      
    } catch (err) {
      setError("Error signing up. Try again." + err);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center  text-white">
      <motion.div
        className="w-full max-w-md bg-gray-800/30 p-8 rounded-xl shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center">Sign Up</h1>
        {error && <p className="text-red-400 text-center mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-700/30 text-white outline-1"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-700/40 text-white outline-1"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-700/40 text-white outline-1"
          />
          <button
            type="submit"
            className="w-full bg-red-500 p-3 rounded-md font-bold hover:bg-red-600 transition"
          >
            Sign Up
          </button>
          <p>
            <Link href={`/signIn`} className="hover:underline ">
              Already have an account
            </Link>
          </p>
        </form>
      </motion.div>
    </main>
  );
};

export default SignUpPage;
