const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const {
  Costumer,
  Owner,
  UserFbSchema,
  UserGoogleSchema,
} = require("../models");

// Auth COSTUMER
passport.use(
  "costumer-local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const costumer = await Costumer.findOne({ email });

        // Check Email
        if (!costumer) {
          return done(null, false);
        }

        // Check password
        const isMatch = await costumer.isValidPassword(password);

        return isMatch ? done(null, costumer) : done(null, false);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Auth OWNER
passport.use(
  "owner-local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const owner = await Owner.findOne({ email });

        // Check Email
        if (!owner) {
          return done(null, false);
        }
        // Check Password
        const isMatch = await owner.isValidPassword(password);
        return isMatch ? done(null, owner) : done(null, false);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Auth FACEBOOK
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.CLIENT_ID_FACEBOOK,
      clientSecret: process.env.CLIENT_SECRET_FACEBOOK,
      callbackURL: "http://localhost:3000/oauth/facebook/callback",
      profileFields: ["id", "displayName", "email", "photos", "name"],
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        UserFbSchema.findOne({ facebookId: profile.id }, (err, oldUser) => {
          if (!oldUser) {
            const newUser = new UserFbSchema({
              facebookId: profile.id,
              fullName: profile.displayName,
              email: profile.emails[0].value,
              avatar: profile.photos[0].value,
            }).save((err, newUser) => {
              if (err) throw err;
              done(null, newUser);
            });
          }
          done(null, oldUser);
        });
      });
    }
  )
);

// Auth GOOGLE
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID_GOOGLE,
      clientSecret: process.env.CLIENT_SECRET_GOOGLE,
      callbackURL: "http://localhost:3000/oauth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        UserGoogleSchema.findOne({ googleId: profile.id }, (err, oldUser) => {
          if (oldUser) {
            done(null, oldUser);
          } else {
            const newUser = new UserGoogleSchema({
              googleId: profile.id,
              fullName: profile.displayName,
              email: profile.emails[0].value,
              avatar: profile.photos[0].value,
            }).save((err, newUser) => {
              if (err) throw err;
              done(null, newUser);
            });
          }
        });
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
