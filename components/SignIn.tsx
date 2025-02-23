"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";

export function SignIn() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signUp" | "signIn">("signIn");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Add redirect URL to the form data
    formData.append("redirectTo", "/");

    const result = await signIn("password", formData);

    // If sign-in is successful, manually redirect as a fallback
    if (result.redirect) {
      window.location.href = result.redirect.toString();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "300px",
        margin: "0 auto",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <input
        name="email"
        placeholder="Email"
        type="text"
        style={{
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
        required
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        style={{
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
        required
      />
      <input name="flow" type="hidden" value={step} />
      <button
        type="submit"
        style={{
          padding: "0.5rem",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#007bff",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {step === "signIn" ? "Sign in" : "Sign up"}
      </button>
      <button
        type="button"
        onClick={() => setStep(step === "signIn" ? "signUp" : "signIn")}
        style={{
          padding: "0.5rem",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#6c757d",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {step === "signIn" ? "Sign up instead" : "Sign in instead"}
      </button>
    </form>
  );
}
