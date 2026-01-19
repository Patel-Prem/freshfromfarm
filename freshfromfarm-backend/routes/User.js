import express from "express";
import conf from "../config/config.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// express validator
import validator from "../auth/validator.js";
import auth from "../auth/auth.js";

// controller functions
import userRouter from "../controllers/UserController.js";
import Users from "../models/Users.js";

const router = express.Router();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: conf.GOOGLE_CLIENT_ID,
      clientSecret: conf.GOOGLE_CLIENT_SECRET,
      callbackURL: conf.GOOGLE_CALLBACK_URL,
      passReqToCallback: true, // <---- This passes req to the callback
    },
    function (req, accessToken, refreshToken, profile, cb) {
      Users.findOne({ email: profile._json.email }).then((currentUser) => {
        if (currentUser) {
          // already have this user
          console.log("user is: ", currentUser);
          cb(null, currentUser);
        } else {
          // if not, create user in our db
          new Users({
            googleId: profile.id,
            name: profile.displayName,
            email: profile._json.email,
            is_merchant: req.session.user,
          })
            .save()
            .then((newUser) => {
              console.log("created new user: ", newUser);
              cb(null, newUser);
            });
        }
        // return cb(null, profile);
      });
    }
  )
);

//signup with google
router.get("/google",
  (req, res, next) => {
    req.session.user = req.query.userType;
    return next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//google callback
router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3001/login",
    failureMessage: true,
  }),
  function (req, res) {
    res.redirect("http://localhost:3001/add");
  }
);

//register route
router.post("/signup",
  validator.userCreationRules(),
  validator.validateRule,
  (req, res) => {
    userRouter.registerUser(req, res);
  }
);

//login route
router.post("/login",
  validator.userLoginRules(),
  validator.validateRule,
  (req, res) => {
    userRouter.loginUser(req, res);
  }
);

//Re-Send OTP route
router.post("/reSendOtp",
  (req, res) => {
    userRouter.reSendOtp(req, res);
  }
);

//verify OTP route
router.post("/verifyOtp",
  (req, res) => {
    userRouter.verifyOtp(req, res);
  }
);

// Forget Password
router.post("/forgetPassword",
  (req, res) => {
    userRouter.forgetPassword(req, res);
  }
)

// Reset Password
router.post("/resetPassword/:token",
  (req, res) => {
    userRouter.resetPassword(req, res);
  }
)

//getUser route
router.post("/refresh", (req, res) => {
  userRouter.refreshToken(req, res);
});

//getUser route
router.post("/getUser", auth.fetchUser, (req, res) => {
  userRouter.getUser(req, res);
});

// Signout route
router.post("/logout", auth.fetchUser, (req, res) => {
  userRouter.signOutUser(req, res);
});

export default router;
