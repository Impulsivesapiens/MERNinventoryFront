import NextAuth from "next-auth";
import { mongooseConnect } from "@/lib/mongoose";
import { People } from "@/models/People";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await mongooseConnect();
          const user = await People.findOne({ email: email });

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }

          return user;
        } catch (e) {
          console.log(e);
        }
      },
    }),
  ],
  session: {
    stratergy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);
