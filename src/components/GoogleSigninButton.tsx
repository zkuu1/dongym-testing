'use client';

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const AuthButton = () => {
  const { data: session } = useSession();

  return !session?.user ? (
    <button
      onClick={() => signIn("google", { callbackUrl: "/user" })}
      className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-xl py-3 px-4 text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow"
    >
      <FcGoogle className="text-2xl" />
      Login With Google
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

const SigninButton = () => {
  return (
    <div className="flex gap-4 ml-auto items-center">
      <AuthButton />
    </div>
  );
};

export default SigninButton;