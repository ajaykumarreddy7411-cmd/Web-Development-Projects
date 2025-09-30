import express from "express";
const router=express.Router();
import { getDetails,setDetails,delDetails, updateDetails } from "../controllers/detailsController.js";

router.get("/",getDetails);
router.post("/",setDetails);
router.delete("/:id",delDetails);
router.put("/:id",updateDetails);

export default router;