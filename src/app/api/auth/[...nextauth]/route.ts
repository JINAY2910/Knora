import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                await dbConnect();

                const existingUser = await User.findOne({ email: user.email });

                if (!existingUser) {
                    await User.create({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        progress: {},
                        role: "student",
                    });
                } else {
                    // Update user image if it changed
                    if (existingUser.image !== user.image || existingUser.name !== user.name) {
                        existingUser.name = user.name;
                        existingUser.image = user.image;
                        await existingUser.save();
                    }
                }

                return true;
            } catch (error) {
                console.error("Error saving user to database", error);
                return false;
            }
        },
        async jwt({ token, user }) {
            if (user) {
                await dbConnect();
                const dbUser = await User.findOne({ email: user.email });
                if (dbUser) {
                    token.id = dbUser._id.toString();
                    token.role = dbUser.role;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                // @ts-ignore
                session.user.id = token.id as string;
                // @ts-ignore
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    pages: {
        // Optionally define custom login pages
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
