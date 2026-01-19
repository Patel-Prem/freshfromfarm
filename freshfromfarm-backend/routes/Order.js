import express from 'express';
import orderRoute from '../controllers/OrderController.js';
import auth from '../auth/auth.js';

const router = express.Router();

router.get("/getorders", auth.fetchUser, (req, res) =>
    orderRoute.getOrders(req, res)
);

router.post("/checkOut", (req, res) =>
    orderRoute.checkOut(req, res)
);

router.put("/:id/changeStatus", (req, res) => {
    orderRoute.changeStatus(req, res);
});

export default router;