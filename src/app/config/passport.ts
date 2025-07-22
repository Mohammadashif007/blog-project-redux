/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import config from ".";
import { User } from "../module/user/user.model";
import { Role } from "../module/user/user.interface";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

// ! passport local login

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const isGoogleAuthenticated = user.auths.some(
          (e) => e.provider == "google",
        );
        if (isGoogleAuthenticated) {
          return done(null, false, {
            message: "User authenticate through google. If you want to login with credentials please set a password at first.",
          });
        }

        const isPasswordMatch = bcrypt.compare(
          password,
          user.password as string,
        );
        if (!isPasswordMatch) {
          return done(null, false, { message: "Password does not match" });
        }

        return done(null, user);
      } catch (error) {
        console.log(error);
        done(error);
      }
    },
  ),
);

// ! passport for local
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//     },
//     async (email: string, password: string, done) => {
//       try {
//         const user = await User.findOne({ email });

//         if (!user) return done(null, false, { message: "User not found" });

//         const isGoogleAuthenticated = user.auths.some(
//           (e) => e.provider == "google",
//         );
//         if (isGoogleAuthenticated) {
//           return done(null, false, {
//             message:
//               "You have authenticated through google. Please set a password and then login with credentials",
//           });
//         }

//         const isMatch = await bcrypt.compare(
//           password as string,
//           user.password as string,
//         );

//         if (!isMatch) {
//           done(null, false, { message: "Password dose not match" });
//         }
//         return done(null, user);
//       } catch (error) {
//         console.log(error);
//         done(error);
//       }
//     },
//   ),
// );

// ! practice credential

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const isGoogleAuthenticated = user.auths.some(
          (e) => e.provider == "google",
        );
        if (isGoogleAuthenticated) {
          return done(null, false, {
            message: "You have authenticated with google",
          });
        }

        const isMatch = await bcrypt.compare(password, user.password as string);
        if (!isMatch) {
          return done(null, false, { message: "Password dose not match" });
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    },
  ),
);

// ! passport for google
passport.use(
  new GoogleStrategy(
    {
      clientID: config.google_client_id as string,
      clientSecret: config.google_client_secret as string,
      callbackURL: config.google_callback_url,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback,
    ) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) {
          return done(null, false, { message: "No email found" });
        }
        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            email,
            name: profile.displayName,
            picture: profile.photos?.[0].value,
            role: Role.USER,
            isVerified: true,
            auths: [
              {
                provider: "google",
                providerId: profile.id,
              },
            ],
          });
        }
        return done(null, user);
      } catch (error) {
        console.log("google strategy error", error);
        return done(error);
      }
    },
  ),
);

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await User.findById({ id });
    done(null, user);
  } catch (error) {
    console.log(error);
    done(error);
  }
});
