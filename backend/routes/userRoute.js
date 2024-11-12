import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';
import {authenticate} from '../middlewares/authmiddle.js';
import { searchUsers, getDefaultUsers } from '../controllers/searchController.js';
// import { upload } from '../middleware/multer.middleware.js';
// import { getUserProfile } from '../controllers/ProfileController.js';



 
// Route-level Middleware - To Protect Routes
// router.use('/changepassword', checkUserAuth);
// router.use('/loggeduser', checkUserAuth);

// Public Routes
router.post('/register', UserController.userRegistration);
router.post("/feedback", authenticate, UserController.feedback);
router.get('/feedbacks', UserController.getallFeedback);


router.get('/search',authenticate,searchUsers)
router.get('/:id',authenticate,UserController.getUser)
router.get('/default', authenticate, getDefaultUsers);
router.post('/login', UserController.userLogin);
// router.post('/send-reset-password-email', UserController.sendUserPasswordResetEmail);
// router.post('/reset-password/:id/:token', UserController.userPasswordReset);

// router.post('/updateAccountDetails', UserController.updateAccountDetails);
// // router.post('/updateUserAvatar', upload.single('avatar'), UserController.updateUserAvatar);
// router.post('/logoutUser', UserController.logoutUser);
// router.post('/updateGameStats', UserController.updateGameStats);

// // Protected Routes
// router.post('/changepassword', UserController.changeUserPassword);
// router.get('/loggeduser', UserController.loggedUser);

export default router;