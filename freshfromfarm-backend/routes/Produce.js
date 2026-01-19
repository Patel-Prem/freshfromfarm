import express from 'express';

// express validator
import validator from '../auth/validator.js';
import auth from '../auth/auth.js';

// controller functions
import produceRoute from '../controllers/ProduceController.js';

// importing generateProduceId 
import { generateProduceId } from "../middleware/PreGenerateID.js"

const router = express.Router();

router.post(
  "/addProduce",
  auth.fetchUser,                                   // ✅ must run first
  generateProduceId,
  produceRoute.upload.array("produce_media"),       // ✅ handles both req.body and req.files
  validator.produceAddRules(),
  validator.validateRule,
  produceRoute.addProduce
);

// delete produce route
router.delete("/delete", auth.fetchUser, (req, res) => {
  produceRoute.deleteProduce(req, res);
});

// get all produce list and details
router.get("/getAllProduce", auth.fetchUser, (req, res) => {
  produceRoute.getAllProduceDetails(req, res);
});

// get produce list and details
router.get("/getProduce/:id", auth.fetchUser, (req, res) => {
  produceRoute.getProduceDetails(req, res);
});

export default router;
