import { authenticate } from "../middlewares/authmiddle.js";
import { searchUsers } from "../controllers/searchController.js";
import express from "express";

const router = express.Router()

router.get('/search',authenticate,searchUsers)

export default router;