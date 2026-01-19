import { STATES } from "mongoose";
import Orders from "../models/Orders.js";

import { MESSAGES } from "../constants/messages.js";
import { STATUS } from "../constants/httpStatusCodes.js";

const orderController = {

    checkOut: async (req, res) => {

        const { customerId, items } = req.body
        try {
            const order = new Orders({
                customerId,
                items,
            });

            await order.save();

            return res.status(STATES.CREATED).json({
                status: STATUS.FAILED,
                responseType: MESSAGES.RESPONSETYPE.SUCCEED,
                message: MESSAGES.ORDER.CREATED,
                order,
            });
        } catch (error) {
            console.log("Error orderController.js -> checkOut : ", error);
            res.status(STATES.INTERNAL_SERVER_ERROR).json({
                status: STATUS.FAILED,
                responseType: MESSAGES.RESPONSETYPE.FAILED,
                message: MESSAGES.STATES.INTERNAL_SERVER_ERROR
            });
        }

    },

    getOrders: async (req, res) => {
        const merchantId = req.user.id;
        try {
            const merchantOrders = await Orders.find({ "items.merchantId": merchantId });

            return res.status(STATUS.OK).json({
                status: STATUS.SUCCEED,
                responseType: MESSAGES.RESPONSETYPE.SUCCEED,
                // message: "Orders fetched successfully",
                merchantOrders,
            });
        } catch (error) {
            console.log("Error orderController.js -> getOrders : ", error);
            res.status(STATES.INTERNAL_SERVER_ERROR).json({
                status: STATUS.FAILED,
                responseType: MESSAGES.RESPONSETYPE.FAILED,
                message: MESSAGES.STATES.INTERNAL_SERVER_ERROR
            });
        }
    },

    changeStatus: async (req, res) => {
        try {
            const { updatedStatus } = req.body;
            const updatedOrder = await Orders.findByIdAndUpdate(
                req.params.id,
                {
                    $set: { status: updatedStatus },
                    $push: { statusHistory: { status: updatedStatus, changedAt: new Date() } }
                },
                { new: true }
            );

            return res.status(STATUS.OK).json({
                status: STATUS.SUCCEED,
                responseType: MESSAGES.RESPONSETYPE.SUCCEED,
                message: MESSAGES.ORDER.STATUS_UPDATED
            });
        } catch (error) {
            console.log("Error orderController.js -> changeStatus : ", error);
            res.status(STATES.INTERNAL_SERVER_ERROR).json({
                status: STATUS.FAILED,
                responseType: MESSAGES.RESPONSETYPE.FAILED,
                message: MESSAGES.STATES.INTERNAL_SERVER_ERROR
            });
        }
    }

};

export default orderController;