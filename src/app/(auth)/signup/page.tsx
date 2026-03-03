/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // await signUp(email, password);
      await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      window.location.href = "/dashboard"; // Redirect on success
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-sm p-8 bg-white shadow-lg rounded-xl"
      >
        <h1 className="text-2xl font-bold mb-6 text-black">Create Account</h1>
        <input
          type="text"
          placeholder="Full Name"
          required
          className="w-full p-3 mb-4 border rounded text-black"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 mb-4 border rounded text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          required
          className="w-full p-3 mb-4 border rounded text-black"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
          Sign Up
        </button>
        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
