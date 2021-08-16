import NextAuth, { NextAuthOptions } from 'next-auth';
import Providers from 'next-auth/providers';
import { NextApiRequest, NextApiResponse } from 'next';
import { SanityAdapter, SanityCredentials } from 'next-auth-sanity';
import { client } from "../../../../lib/sanity"

const options: NextAuthOptions = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    SanityCredentials(client) // only if you use sign in with credentials
  ],
  session: {
    jwt: true
  },
  adapter: SanityAdapter(client)
};


export default function Auth (req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, options);
}