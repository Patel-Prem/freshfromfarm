import mongoose from 'mongoose'

const ProduceSchema = new mongoose.Schema({
    merchant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    discounted_price: {
        type: String,
        required: true,
    },
    quantity_unit:{
        type: String,
        enum:['lb', 'pc', 'pkt']
    },
    quantity:{
        type: Number,
        required: true,
    },
    is_deleted: {
        type: Number,
        default: 0,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true,
    }
})

export default mongoose.model('produce', ProduceSchema)
