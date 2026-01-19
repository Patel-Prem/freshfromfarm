import mongoose from "mongoose";
export const generateProduceId = (req, res, next) => {
    const produceId = new mongoose.Types.ObjectId();
    req.produceId = produceId.toString();
    req.file_of = 'produce';
    next();
};
