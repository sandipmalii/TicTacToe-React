import {authenticate} from "../middlewares/authmiddle.js"
import express from "express"
import { getUserProfile , updateUser} from '../controllers/ProfileController.js';

const router = express.Router()

router.get('/',authenticate,getUserProfile)
router.put('/save/:id',updateUser)

export default router