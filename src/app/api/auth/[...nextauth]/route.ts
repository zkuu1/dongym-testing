import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Github from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
          role: "user",
        };
      },
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: "user",
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password wajib diisi");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("User tidak ditemukan atau belum set password");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Password salah");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  callbacks: {
      async jwt({ token, user }) {
      if (user) {
        // ketika pertama kali login
        token.role = (user as any).role ?? "user";
        token.name = user.name ?? null;
        token.image = (user as any).image ?? null;

        console.log("✅ JWT Token after login:", {
          id: (user as any).id, // pakai user.id
          email: user.email,
          role: token.role,
          name: token.name,
        });
      } else {
        // request selanjutnya → ambil dari token.sub
        console.log("🔄 JWT Token on subsequent request:", {
          id: token.id, // pakai token.id sesuai tipe token
          email: token.email,
          role: token.role,
          name: token.name,
        });
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string;
      }

      console.log("📦 Session object sent to client:", session);

      return session;
    },
  },
  events: {
    async createUser(message) {
      // User otomatis dibuat oleh PrismaAdapter, jadi tidak perlu prisma.user.create lagi
      console.log("🆕 New user created:", message.user);

      await prisma.membership.create({
        data: {
          userId: message.user.id,
          id: message.user.id,
          startDate: "-",
          endDate: "-",
          status: "nonactive",
          type: "non membership",
        },
      });
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
