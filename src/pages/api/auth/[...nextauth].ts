import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from '../../../../lib/prisma'
import { session } from "next-auth/client";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
    // Providers.Google({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // })
  ],

  // database: process.env.DATABASE_URL,
  // adaptor: PrismaAdapter(prisma),
  debug: true,
  // callbacks: {
  //   async session(session, user) {
  //     session.user = user;
  //     console.log('session.user', session.user);
  //     return session
  //   }
  // }
});