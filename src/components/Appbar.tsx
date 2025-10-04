"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ ambil path aktif
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const Appbar = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname(); // ✅ path aktif

  const isAdmin = session?.user?.role === "admin";
  const isLogin = session?.user?.role === "user";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/muscle", label: "Hit The Muscle" },
    { href: "/about", label: "About Us" },
    { href: "/others", label: "Others" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md bg-base_purple opacity-75 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          {/* Hamburger menu (mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 rounded-md focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Logo */}
          <div className="flex shrink-0 md:ml-0 mx-auto md:mx-0">
            <Link href="/" className="flex items-center">
              <h2 className="ml-4 text-md font-bold text-white">Don Gym</h2>
              <span className="sr-only">Website Title</span>
            </Link>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-base_purple shadow-lg md:hidden z-40">
              <div className="flex flex-col py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 transition ${
                      pathname === link.href
                        ? "bg-white text-gray-900"
                        : "text-white hover:bg-purple-700"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                {isLogin && (
                  <Link
                    href="/user"
                    className={`px-4 py-2 transition ${
                      pathname === "/user"
                        ? "bg-white text-gray-900"
                        : "text-white hover:bg-purple-700"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}

                {isAdmin && (
                  <Link
                    href="/admin"
                    className={`px-4 py-2 transition ${
                      pathname === "/admin"
                        ? "bg-white text-gray-900"
                        : "text-white hover:bg-purple-700"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}

                {session ? (
                  <button
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 text-left text-white hover:bg-purple-700"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      href="/register"
                      className={`px-4 py-2 transition ${
                        pathname === "/register"
                          ? "bg-white text-gray-900"
                          : "text-white hover:bg-purple-700"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                    <Link
                      href="/login"
                      className={`px-4 py-2 transition ${
                        pathname === "/login"
                          ? "bg-white text-gray-900"
                          : "text-white hover:bg-purple-700"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Desktop nav */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex md:items-center md:gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-block rounded-lg px-2 py-1 text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-white text-gray-900"
                    : "text-white hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isAdmin && (
              <Link
                href="/admin"
                className={`inline-block rounded-lg px-2 py-1 text-sm font-medium transition-all duration-200 ${
                  pathname === "/admin"
                    ? "bg-white text-gray-900"
                    : "text-white hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                Admin
              </Link>
            )}

            {isLogin && (
              <Link
                href="/user"
                className={`inline-block rounded-lg px-2 py-1 text-sm font-medium transition-all duration-200 ${
                  pathname === "/user"
                    ? "bg-white text-gray-900"
                    : "text-white hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Auth (desktop kanan) */}
          <div className="flex items-center justify-end gap-3">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2"
                >
                  <span className="text-white font-medium hidden sm:inline">
                    {session.user?.name}
                  </span>
                  <div className="h-8 w-8 rounded-full overflow-hidden">
                    <Image
                      src={session.user?.image || "/default-avatar.png"}
                      alt={session.user?.name || "User avatar"}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      href="/user"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Admin
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        signOut();
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/register"
                  className={`hidden sm:inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 ${
                    pathname === "/register"
                      ? "bg-white text-base_purple"
                      : "text-white hover:bg-purple-200"
                  }`}
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold shadow-sm transition-all duration-150 ${
                    pathname === "/login"
                      ? "bg-white text-base_purple"
                      : "bg-white text-base_purple hover:bg-purple-200"
                  }`}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Appbar;
