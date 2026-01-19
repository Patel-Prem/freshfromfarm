
import { MESSAGES } from "../constants/messages.js";
import { STATUS } from "../constants/httpStatusCodes.js";
import bcrypt from "bcrypt";

export const generateOTP = async (email) => {

    try {
        const otp = Math.floor(100000 + Math.random() * 900000); // 6 digits
        const salt = await bcrypt.genSalt(10);
        const hashedOtp = await bcrypt.hash(otp.toString(), salt);
        
        return {otp, hashedOtp};

    } catch (error) {
        console.log("Error Utils -> generateOtp.js : ", error);
        // return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
        //     status: STATUS.FAILED,
        //     responseType: MESSAGES.RESPONSETYPE.FAILED,
        //     message: MESSAGES.STATUS.INTERNAL_SERVER_ERROR,
        // });
    }
};


