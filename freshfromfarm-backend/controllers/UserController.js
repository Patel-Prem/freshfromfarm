import auth from "../auth/auth.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import passport from "passport";
import Users from "../models/Users.js";
import conf from "../config/config.js";

import { MESSAGES } from "../constants/messages.js";
import { STATUS } from "../constants/httpStatusCodes.js";
import { sendEmailTemplate } from "../services/emailService.js";
import { generateOTP } from "../utils/generateOTP.js";


const userController = {

  isUserExist: async (email) => {
    try {
      let user = await Users.findOne({ email });
      if (user) {
        return { true: true, user }
      }
      else {
        return false
      }
    } catch (error) {
      console.error("Error userController.js -> isUserExist:", error);
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
        status: STATUS.FAILED,
        responseType: MESSAGES.RESPONSETYPE.FAILED,
        message: MESSAGES.STATUS.INTERNAL_SERVER_ERROR,
      });
    }
  },

  registerUser: async (req, res) => {
    const { first_name, last_name, mobile_no, email, password, is_merchant } = req.body;

    try {
      let user = await Users.findOne({ email });
      if (user) {
        return res.status(STATUS.CONFLICT).json({
          status: STATUS.FAILED,
          responseType: MESSAGES.RESPONSETYPE.FAILED,
          message: MESSAGES.USER.ALREADY_EXISTS,
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      const { otp, hashedOtp } = await generateOTP();

      user = new Users({
        first_name,
        last_name,
        mobile_no,
        email,
        password: hashedPass,
        is_merchant,
        otp: hashedOtp,
      });

      await user.save();

      await sendEmailTemplate("VERIFICATION_CODE", user.email, {
        USER_NAME: user.first_name,
        OTP_CODE: otp,
      });

      return res.status(STATUS.CREATED).json({
        status: STATUS.SUCCEED,
        responseType: MESSAGES.RESPONSETYPE.SUCCEED,
        message: MESSAGES.AUTH.OTP_SENT,
      });


      // ******************************
      // const accessToken = auth.createAccessToken(
      //   {
      //     id: user._id,
      //     is_merchant: user.is_merchant,
      //   },
      //   conf.ACCESS_TOKEN_SECRET
      // );

      // const refreshToken = auth.createRefreshToken(
      //   {
      //     id: user._id,
      //     is_merchant: user.is_merchant,
      //   },
      //   conf.REFRESH_TOKEN_SECRET
      // );

      // res.cookie("refreshToken", refreshToken, {
      //   httpOnly: true,
      //   sameSite: "Lax",
      //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      //   // maxAge: 1000 * 10, // 10 sec
      //   domain: "localhost",
      //   path: "/",
      // });

      // // store refreshToken and update last login time in the database
      // await Users.findOneAndUpdate(
      //   { _id: user._id },
      //   { $set: { refresh_token: refreshToken, last_login: new Date() } },
      //   { new: true } // remove upsert if you don't want to create
      // );

      // return res.status(STATUS.CREATED).json({
      //   status: STATUS.SUCCEED,
      //   responseType: MESSAGES.RESPONSETYPE.SUCCEED,
      //   message: MESSAGES.USER.CREATED,
      //   redirectTo: "/dashboard",
      //   accessToken,
      // });
      // ******************************


    } catch (error) {
      console.log("Error userController.js -> registerUser : ", error);
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
        status: STATUS.FAILED,
        responseType: MESSAGES.RESPONSETYPE.FAILED,
        message: MESSAGES.STATUS.INTERNAL_SERVER_ERROR,
      });
    }
  },

  loginUser: async (req, res) => {
    console.log("called.....")
    const { email, password, is_merchant } = req.body;

    try {
      const user = await Users.findOne({ email, is_merchant, is_deleted: 0 });
      if (!user) {
        return res.status(STATUS.UNAUTHORIZED).json({
          status: STATUS.FAILED,
          responseType: MESSAGES.RESPONSETYPE.FAILED,
          message: MESSAGES.USER.NOT_FOUND,
        });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(STATUS.UNAUTHORIZED).json({
          status: STATUS.FAILED,
          responseType: MESSAGES.RESPONSETYPE.FAILED,
          message: MESSAGES.USER.INVALID_CREDENTIALS,
        });
      }

      const accessToken = auth.createAccessToken(
        {
          id: user._id,
          is_merchant: user.is_merchant,
        },
        conf.ACCESS_TOKEN_SECRET
      );
      const refreshToken = auth.createRefreshToken(
        {
          id: user._id,
          is_merchant: user.is_merchant,
        },
        conf.REFRESH_TOKEN_SECRET
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        // maxAge: 1000 * 10, // 10 sec
        domain: "localhost",
        path: "/",
      });

      const userInitials = user.first_name.charAt(0).toUpperCase() + user.last_name.charAt(0).toUpperCase()

      // store refreshToken and update last login time in the database
      await Users.findOneAndUpdate(
        { _id: user._id },
        { $set: { refresh_token: refreshToken, last_login: new Date() } },
        { new: true } // remove upsert if you don't want to create
      );
      return res.status(STATUS.OK).json({
        status: STATUS.SUCCEED,
        responseType: MESSAGES.RESPONSETYPE.SUCCEED,
        message: MESSAGES.AUTH.LOGGED_IN,
        redirectTo: "/dashboard",
        accessToken,
        userInitials,
      });
    } catch (error) {
      console.log("Error userController.js -> loginUser : ", error);
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
        status: STATUS.FAILED,
        responseType: MESSAGES.RESPONSETYPE.FAILED,
        message: MESSAGES.STATUS.INTERNAL_SERVER_ERROR,
      });
    }
  },

  reSendOtp: async (req, res) => {
    const { email } = req.body

    const { otp, hashedOtp } = generateOTP()

    const user = await Users.findOneAndUpdate(
      { email },
      {
        $set: {
          otp: hashedOtp,
        },
      },
      { upsert: true, new: true }
    );

    await user.save()

    await sendEmailTemplate("VERIFICATION_CODE", user.email, {
      USER_NAME: user.first_name,
      OTP_CODE: otp,
    });

    return res.status(STATUS.CREATED).json({
      status: STATUS.SUCCEED,
      responseType: MESSAGES.RESPONSETYPE.SUCCEED,
      message: MESSAGES.AUTH.OTP_SENT,
    });

  },

  verifyOtp: async (req, res) => {
    const { email, otp } = req.body;

    try {
      const user = await Users.findOne({ email, is_deleted: 0 });
      if (!user) {
        return res.status(STATUS.NOT_FOUND).json({
          status: STATUS.FAILED,
          responseType: MESSAGES.RESPONSETYPE.FAILED,
          message: MESSAGES.USER.NOT_FOUND
        });
      }

      if (Date.now() > user.otp_expires_at) {
        return res.status(STATUS.UNAUTHORIZED).json({
          status: STATUS.FAILED,
          responseType: MESSAGES.RESPONSETYPE.FAILED,
          message: MESSAGES.AUTH.OTP_EXPIRED
        });
      }

      if (user.is_otp_used && user.is_verified) {
        return res.status(STATUS.CONFLICT).json({
          status: STATUS.FAILED,
          responseType: MESSAGES.RESPONSETYPE.FAILED,
          message: MESSAGES.USER.ALREADY_VERIFIED
        });
      }

      if (user.is_otp_used && !user.is_verified) {
        return res.status(STATUS.CONFLICT).json({
          status: STATUS.FAILED,
          responseType: MESSAGES.RESPONSETYPE.FAILED,
          message: MESSAGES.AUTH.OTP_ALREADY_USED
        });
      }

      if (!user.is_otp_used && user.is_verified) {
        return res.status(STATUS.BAD_REQUEST).json({
          status: STATUS.FAILED,
          responseType: MESSAGES.RESPONSETYPE.FAILED,
          message: MESSAGES.AUTH.VERIFICATION_INVALID
        });
      }

      const isMatch = await bcrypt.compare(otp, user.otp);
      if (!isMatch) {
        return res.status(STATUS.UNAUTHORIZED).json({
          status: STATUS.FAILED,
          responseType: MESSAGES.RESPONSETYPE.FAILED,
          message: MESSAGES.AUTH.INVALID_OTP
        });
      }

      // CREATE TOKEN AND REDIRECT TO DASHBOARD

      const accessToken = auth.createAccessToken(
        {
          id: user._id,
          is_merchant: user.is_merchant,
        },
        conf.ACCESS_TOKEN_SECRET
      );

      const refreshToken = auth.createRefreshToken(
        {
          id: user._id,
          is_merchant: user.is_merchant,
        },
        conf.REFRESH_TOKEN_SECRET
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        // maxAge: 1000 * 10, // 10 sec
        domain: "localhost",
        path: "/",
      });

      // store refreshToken and update last login time in the database
      await Users.findOneAndUpdate(
        { _id: user._id },
        {
          $set: {
            is_otp_used: true,
            is_verified: true,
            refresh_token: refreshToken,
            last_login: Date.now()
          }
        },
        { new: true } // remove upsert if you don't want to create
      );

      // return res.status(STATUS.CREATED).json({
      //   status: STATUS.SUCCEED,
      //   responseType: MESSAGES.RESPONSETYPE.SUCCEED,
      //   message: MESSAGES.USER.CREATED,
      //   redirectTo: "/dashboard",
      //   accessToken,
      // });

      res.status(200).json({
        status: STATUS.SUCCEED,
        responseType: MESSAGES.RESPONSETYPE.SUCCEED,
        message: MESSAGES.AUTH.OTP_VERIFIED,
        redirectTo: "/dashboard",
        accessToken,
      });
    } catch (error) {
      console.error("Error userController.js -> verifyOtp:", error);
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
        status: STATUS.FAILED,
        responseType: MESSAGES.RESPONSETYPE.FAILED,
        message: MESSAGES.STATUS.INTERNAL_SERVER_ERROR,
      });
    }
  },

  forgetPassword: async (req, res) => {
    const { email } = req.body

    try {
      const user = await Users.findOne({ email, is_deleted: 0 })

      if (!user) {
        return res.status(STATUS.UNAUTHORIZED).json({
          status: STATUS.FAILED,
          responseType: MESSAGES.RESPONSETYPE.FAILED,
          message: MESSAGES.USER.NOT_FOUND,
        });
      }

      // Handle Password rest link....

      const token = crypto.randomBytes(20).toString("hex");
      // Set token & expiration (5 mins)
      user.reset_password_token = token;
      user.reset_password_expires_at = Date.now() + 5 * 60 * 1000; // 5 minutes

      await user.save();

      // Send email with link
      const resetLink = `http://localhost:3001/reset-password/${token}`;

      await sendEmailTemplate("PASSWORD_RESET", user.email, {
        USER_NAME: user.first_name,
        RESET_LINK: resetLink,
      });

      return res.status(STATUS.CREATED).json({
        status: STATUS.SUCCEED,
        responseType: MESSAGES.RESPONSETYPE.SUCCEED,
        message: MESSAGES.AUTH.PASSWORD_RESET,
      });
    } catch (error) {
      console.error("Error userController.js -> fotgetPassword:", error);
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
        status: STATUS.FAILED,
        responseType: MESSAGES.RESPONSETYPE.FAILED,
        message: MESSAGES.STATUS.INTERNAL_SERVER_ERROR,
      });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;
      const user = await Users.findOne({
        reset_password_token: token,
      });

      if (!user) {
        return res.status(STATUS.NOT_FOUND).json({
          status: STATUS.FAILED,
          responseType: MESSAGES.RESPONSETYPE.FAILED,
          message: MESSAGES.USER.NOT_FOUND
        });
      }

      if (Date.now() > user.reset_password_expires_at) {
        return res.status(STATUS.UNAUTHORIZED).json({
          status: STATUS.FAILED,
          responseType: MESSAGES.RESPONSETYPE.FAILED,
          message: MESSAGES.AUTH.LINK_EXPIRED
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update user
      user.password = hashedPassword;
      user.reset_password_token = undefined; // clear token
      user.reset_password_expires_at = undefined; // clear expiration

      await user.save();

      res.status(200).json({
        status: STATUS.SUCCEED,
        responseType: MESSAGES.RESPONSETYPE.SUCCEED,
        message: MESSAGES.AUTH.PASSWORD_CHANGED,
        redirectTo: "/login",
      });

    } catch (error) {
      console.error("Error userController.js -> fotgetPassword:", error);
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
        status: STATUS.FAILED,
        responseType: MESSAGES.RESPONSETYPE.FAILED,
        message: MESSAGES.STATUS.INTERNAL_SERVER_ERROR,
      });
    }
  },

  refreshToken: async (req, res) => {
    try {
      const incomingRefreshToken = req.cookies.refreshToken;

      if (!incomingRefreshToken) {
        return res.status(STATUS.UNAUTHORIZED).json({
          status: STATUS.FAILED,
          responseType: MESSAGES.RESPONSETYPE.FAILED,
          message: MESSAGES.AUTH.TOKEN_EXPIRED,
        });
      }

      // First: verify the refresh token
      let decodedToken;
      try {
        decodedToken = auth.verifyToken(
          incomingRefreshToken,
          conf.REFRESH_TOKEN_SECRET
        );
      } catch (error) {
        return res.status(STATUS.UNAUTHORIZED).json({
          status: STATUS.FAILED,
          responseType: MESSAGES.RESPONSETYPE.FAILED,
          message: MESSAGES.AUTH.TOKEN_EXPIRED,
        });
      }

      // Then check if the refresh token exists in DB for this user
      const user = await Users.findOne({
        _id: decodedToken.id,
        refresh_token: incomingRefreshToken,
      });

      if (!user) {
        return res.status(STATUS.UNAUTHORIZED).json({
          status: STATUS.FAILED,
          responseType: MESSAGES.RESPONSETYPE.FAILED,
          message: MESSAGES.AUTH.SESSION_EXPIRED,
        });
      }

      // Generate a new access token
      const accessToken = auth.createAccessToken(
        {
          id: decodedToken.id,
          is_merchant: decodedToken.is_merchant,
        },
        conf.ACCESS_TOKEN_SECRET
      );

      return res.status(STATUS.OK).json({
        status: STATUS.SUCCEED,
        responseType: MESSAGES.RESPONSETYPE.SUCCEED,
        // message: "Access token refreshed successfully",
        accessToken,
      });
    } catch (error) {
      console.error("Error userController.js -> refreshToken:", error);
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
        status: STATUS.FAILED,
        responseType: MESSAGES.RESPONSETYPE.FAILED,
        message: MESSAGES.STATUS.INTERNAL_SERVER_ERROR,
      });
    }
  },

  googleCallBack: async (req, res) => {
    passport.authenticate("google", {
      failureRedirect: "/login",
      failureMessage: true,
    }),
      function (req, res) {
        res.redirect("/dashboard");
      };
  },

  getUser: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await Users.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.log("Error userController.js -> getUser : ", error);
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
        status: STATUS.FAILED,
        responseType: MESSAGES.RESPONSETYPE.FAILED,
        message: MESSAGES.STATUS.INTERNAL_SERVER_ERROR,
      });
    }
  },

  signOutUser: async (req, res) => {
    try {
      if (req.cookies.refreshToken) {
        res.clearCookie("refreshToken");
        // TODO : delete refreshToken from database
        res.status(STATUS.OK).json({
          status: STATUS.SUCCEED,
          responseType: MESSAGES.RESPONSETYPE.SUCCEED,
          message: MESSAGES.AUTH.LOGGED_OUT,
          redirectTo: "/",
        });
      }
    } catch (error) {
      console.log("Error userController.js -> signOutUser : ", error);
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
        status: STATUS.FAILED,
        responseType: MESSAGES.RESPONSETYPE.FAILED,
        message: MESSAGES.STATUS.INTERNAL_SERVER_ERROR,
      });
    }
  },
};

export default userController;
