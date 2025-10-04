'use client';

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa";

const GithubAuthButton = () => {
  const { data: session } = useSession();

  return !session?.user ? (
    <button
      onClick={() => signIn("github", { callbackUrl: "/user" })}
      className="w-full flex items-center justify-center gap-3 bg-gray-900 border border-gray-700 rounded-xl py-3 px-4 text-white font-medium hover:bg-gray-800 transition-colors shadow"
    >
      <FaGithub className="text-2xl" />
      Login With GitHub
    </button>
  ) : (
    <button
      onClick={() => signOut()}
      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
    >
      Sign Out
    </button>
  );
};

const GithubSigninButton = () => {
  return (
    <div className="flex gap-4 ml-auto items-center">
      <GithubAuthButton />
    </div>
  );
};

export default GithubSigninButton;
