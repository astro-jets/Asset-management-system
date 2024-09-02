import type { NextAuthOptions } from "next-auth";
// import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "@/app/actions/auth";
import { JWT } from "next-auth/jwt";

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

export const options: NextAuthOptions = {
  secret: NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email:",
          min: 1,
          type: "email",
          placeholder: "Email",
        },
        password: { label: "Password", type: "password", min: 1 },
      },
      async authorize(credentials) {
        try {
          const user = await signIn({
            email: credentials?.email,
            password: credentials?.password,
          });
          return user;
        } catch (err) {
          throw new Error("Failed to log in");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.id = user._id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user.id = token.id as string;
          session.user.email = token.email!;
          session.user.name = token.name!;
          session.user.role = token.role;
        }
      }
      return session;
    },
  },
};
