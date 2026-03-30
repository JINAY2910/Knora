import { NextAuthOptions } from "next-auth";
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
            } catch (error) {
                // Log the error but still allow login — a DB outage should not
                // completely block authentication.
                console.error("[Auth] DB error during signIn (login still allowed):", error);
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                try {
                    await dbConnect();
                    const dbUser = await User.findOne({ email: user.email });
                    if (dbUser) {
                        token.id = dbUser._id.toString();
                        token.role = dbUser.role;
                    }
                } catch (error) {
                    console.error("[Auth] DB error during jwt callback:", error);
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id as string;
                (session.user as any).role = token.role as string;
            }
            return session;
        },
    },
    pages: {
        // Optionally define custom login pages
    },
};
