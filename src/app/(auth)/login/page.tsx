/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      router.push("/dashboard");
    } catch (err: any) {
      setError("Invalid email or password"); // Simplified error for security
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm p-8 bg-white shadow-lg rounded-xl"
      >
        <h1 className="text-2xl font-bold mb-6 text-black">Welcome Back</h1>
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 mb-4 border rounded text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 mb-4 border rounded text-black"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700">
          Log In
        </button>
        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        <p className="mt-4 text-sm text-gray-600">
          New here?{" "}
          <Link href="/signup" className="text-blue-500">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
