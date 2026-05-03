import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { logger } from "@/lib/logger";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user }) {
            try {
                await dbConnect();

                const existingUser = await User.findOne({ email: user.email });

                if (!existingUser) {
                    await User.create({
                        name: user.name || "Student",
                        email: user.email,
                        image: user.image || "",
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
                logger.error("Auth signIn failed", {
                    error: error instanceof Error ? error.message : "Unknown error",
                    email: user.email,
                });
                return false;
            }
        },
        async jwt({ token, user }) {
            if (user || (token.email && !token.id)) {
                try {
                    await dbConnect();
                    const dbUser = await User.findOne({ email: user?.email ?? token.email });
                    if (dbUser) {
                        token.id = dbUser._id.toString();
                        token.role = dbUser.role;
                    }
                } catch (error) {
                    logger.error("Auth jwt callback failed", {
                        error: error instanceof Error ? error.message : "Unknown error",
                        email: token.email,
                    });
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
            }
            return session;
        },
    },
    pages: {
        // Optionally define custom login pages
    },
};
