import {authenticate} from "../middlewares/authmiddle.js"
import express from "express"
import {addFriend,getUserFriends,checkFriend,removeFriend} from "../controllers/friendController.js"

const router = express.Router()

router.post('/add-friend/:friendId',authenticate,addFriend)
router.get('/',authenticate,getUserFriends)
router.get('/status/:id',authenticate,checkFriend)
router.post('/removefriend/:id',authenticate,removeFriend)

export default router;