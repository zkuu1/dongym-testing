"use client";

import { signIn } from "next-auth/react";

export default function GoogleLoginPage() {
 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-10 w-[320px] text-center">
        <h1 className="text-2xl font-bold mb-6">Login dengan GitHub</h1>
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 border border-white/30 px-6 py-3 rounded-lg shadow-lg backdrop-blur-sm transition duration-300"
        >
          <img
            src="https://www.svgrepo.com/show/512317/github-142.svg"
            alt="GitHub"
            className="w-6 h-6"
          />
          <span className="font-medium">Sign in with GitHub</span>
        </button>
      </div>
    </div>
  );
}
