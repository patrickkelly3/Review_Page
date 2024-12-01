import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "./models/userSchema";
import connectMongoDB from "/Users/patrickkelly/Desktop/UGAConnect/UGAConnect/connect-react/src/libs/mongodb";
import fs from "fs"; // Optional for logging to a file

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  debug: true, // Enable NextAuth debugging
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("authorize function invoked");

        if (!credentials) {
          console.log("No credentials provided");
          return null;
        }

        try {
          // Ensure the database connection
          console.log("Connecting to MongoDB...");
          await connectMongoDB();
          console.log("MongoDB connection established");

          // Check the email from the received credentials
          console.log("Looking up user with email:", credentials.email);

          // Fetch the user from the database
          const user = await User.findOne({ email: credentials.email }).lean();

          if (user) {
            console.log("User found:", user);

            // Validate the password
            const isMatch = await bcrypt.compare(credentials.password, user.password);
            if (isMatch) {
              console.log("Authorization successful for user:", user.email);

              // Return the user object conforming to the `User` type
              return {
                id: user._id.toString(),
                email: user.email,
                username: user.username,
                myid: user.myid,
              };
            } else {
              console.log("Email or Password is incorrect for email:", credentials.email);
              return null;
            }
          } else {
            console.log("User not found with email:", credentials.email);
            return null;
          }
        } catch (error) {
          console.error("An error occurred during authorization:", error);

          // Optional: Write errors to a log file
          fs.appendFileSync(
            "auth_error.log",
            `Error during authorization: ${error.message}\n`
          );

          return null;
        }
      },
    }),
  ],
});
