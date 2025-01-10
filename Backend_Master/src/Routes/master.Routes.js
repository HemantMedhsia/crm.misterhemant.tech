import express from "express";
import {
  createMasterAdmin,
  deleteMasterAdmin,
  getMasterAdmin,
  getMasterAdminById,
  loginMasterAdmin,
  updateMasterAdmin,
} from "../Controller/master.Controller.js";

const router = express.Router();

router.post("/create-master-admin", createMasterAdmin);
router.get("/get-all-master-admin", getMasterAdmin);
router.get("/get-master-admin/:id", getMasterAdminById);
router.put("/update-master-admin/:id", updateMasterAdmin);
router.delete("/delete-master-admin/:id", deleteMasterAdmin);
router.post("/login-master-admin", loginMasterAdmin);

export { router as masterRouter };
