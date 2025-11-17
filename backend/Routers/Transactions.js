import express from "express";
const router = express.Router();

import {
  addTransactionController,
  getAllTransactionController,
  updateTransactionController,
  deleteTransactionController,
} from "../controllers/transactionController.js";

router.post("/addTransaction", addTransactionController);
router.post("/getTransaction", getAllTransactionController);
router.put("/updateTransaction/:id", updateTransactionController);
router.post("/deleteTransaction/:id", deleteTransactionController);

export default router;