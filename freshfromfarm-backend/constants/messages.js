export const MESSAGES = {
    USER: {
        NOT_FOUND: "Account not found.",
        ALREADY_EXISTS: "Account already exists.",
        CREATED: "Account created successfully.",
        UPDATED: "Account updated successfully.",
        DELETED: "Account deleted successfully.",
        INVALID_CREDENTIALS: "Invalid email or password.",
        ALREADY_VERIFIED: "Account is already verified",
        VERIFIED: "Account is Verified",
    },
    AUTH: {
        UNAUTHORIZED: "You are not authorized to access this resource.",
        TOKEN_EXPIRED: "Session expired. Please log in again.",
        LOGGED_IN: "Logged in successfully.",
        LOGGED_OUT: "Logged Out successfully.",
        OTP_SENT: "OTP has been sent to your e-mail, Please check your inbox.",
        OTP_EXPIRED: "OTP expired.",
        INVALID_OTP: "Invalid OTP.",
        OTP_VERIFIED:"OTP verified successfully.",
        OTP_ALREADY_USED: "OTP has alreday been used",
        VERIFICATION_INVALID:"Account verification state is invalid.Please contact support.",
        PASSWORD_RESET: "Password Reset link has been sent to your e-mail, Please check your inbox.",
        LINK_EXPIRED: "Reset password link expired.",
        PASSWORD_CHANGED: "Your password updated successfully."
    },
    ORDER: {
        NOT_FOUND: "Order not found.",
        CREATED: "Order placed successfully.",
        STATUS_UPDATED: "Order Status Updated successfully.",
    },
    PRODUCE: {
        NOT_FOUND: "Produce not found.",
        CREATED: "Produces listed successfully",
        CREATED_WITH_MEDIA: "Produce listed successfully with media.",
        CREATED_WITHOUT_MEDIA: "Produce listed successfully without media.",
        FAILED_TO_LIST: "Failed to save media files. Produce listing has been rolled back.",
        FAILED_TO_UPLOAD_MEDIA : "Failed to upload images to database",
        FAILED_TO_FETCH: "Failed to fetch produce details.",
    },
    GENERAL: {
        SERVER_ERROR: "Something went wrong. Please try again later.",
        BAD_REQUEST: "Invalid request data.",
    },
    RESPONSETYPE: {
        FAILED: "Error",
        SUCCEED: "Success",
    },
    STATUS: {
        OK: "Ok",
        CREATED: "Created",
        BAD_REQUEST: "Bad Request",
        UNAUTHORIZED: "Unauthorized",
        FORBIDDEN: "Forbidden",
        NOT_FOUND: "Not Found",
        CONFLICT: "Conflict",
        INTERNAL_SERVER_ERROR: "Internal Server Error",
    }
};
