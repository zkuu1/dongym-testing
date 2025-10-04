"use client";

import { signIn } from "next-auth/react";

export default function GithubLoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white">
      <h1 className="text-3xl font-bold mb-8">Login dengan GitHub</h1>
      <button
        onClick={() => signIn("github", { callbackUrl: "/" })}
        className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-800 transition"
      >
        <img
          src="https://www.svgrepo.com/show/512317/github-142.svg"
          alt="GitHub"
          className="w-6 h-6"
        />
        <span className="font-medium">Sign in with GitHub</span>
      </button>

    </div>
  );
}
