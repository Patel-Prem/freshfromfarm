import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    items: [{
        merchantId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }
    }],
    totalAmount: {
        type: Number,
        
    },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled", "returned"],
        default: "pending"
    },
    statusHistory: [
        {
            status: String,
            changedAt: { type: Date, default: Date.now }
        }
    ],
    is_deleted: {
        type: Number,
        default: 0,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true,
    },
    uploaded_at: {
        type: Date,
        default: Date.now,
        required: true,
    }
});


// Auto-calculate total before saving
OrderSchema.pre("save", function (next) {
    this.totalAmount = this.items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);
    next();
});

export default mongoose.model('order', OrderSchema)
