import NextAuth, { NextAuthOptions } from "next-auth";
import GitHub from "next-auth/providers/github";
// import { NextApiRequest, NextApiResponse } from "next";
import { SanityAdapter, SanityCredentials } from "next-auth-sanity";
import { client } from "../../../../lib/sanity";

const options: NextAuthOptions = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    SanityCredentials(client), // only if you use sign in with credentials
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  adapter: SanityAdapter(client),
};

export default NextAuth(options);

// export default function Auth(req: NextApiRequest, res: NextApiResponse) {
//   return NextAuth(req, res, options);
// }
