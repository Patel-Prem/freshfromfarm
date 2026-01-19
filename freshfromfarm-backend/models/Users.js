import mongoose from 'mongoose'
import { type } from 'os'

//Address Schema                    
const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        default: null
    },

    first_name: {
        type: String,
        required: true,
    },

    last_name: {
        type: String,
        required: true,
    },
    
    mobile_no: {
        type: String,
        unique: true,
        // required: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        // required: true
    },

    is_merchant: {
        type: Number,
        default: 0,
        required: true,
    },

    otp: {
        type: String,
        required: true,
    },

    is_otp_used: {
        type: Boolean,
        default: false,
        required: true
    },

    otp_expires_at: {
        type: Date,
        default: () => Date.now() + 5 * 60 * 1000, // current time + 5 minutes
        required: true,
    },

    is_verified: {
        type: Boolean,
        default: false
    },

    refresh_token: {
        type: String,
    },

    reset_password_token: {
        type: String,
        default: null,
    },

    reset_password_expires_at: {
        type: Date,
        default: null
    },

    is_deleted: {
        type: Number,
        default: 0,
        required: true,
    },

    last_login: {
        type: Date,
    },
    
    created_at: {
        type: Date,
        default: Date.now,
        required: true,
    }
})

export default mongoose.model('user', UserSchema)