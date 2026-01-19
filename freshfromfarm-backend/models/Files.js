import mongoose from 'mongoose'

const FileSchema = new mongoose.Schema({
    file_of: {
        type: mongoose.Schema.Types.ObjectId,
        // ref: 'produce'
    },
    file_from: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true,
    },
    mimetype: {
        type: String,
        required: true,
    },
    is_deleted: {
        type: Number,
        default: 0,
        required: true,
    },
    uploaded_at: {
        type: Date,
        default: Date.now,
        required: true,
    }
})

export default mongoose.model('file', FileSchema)
