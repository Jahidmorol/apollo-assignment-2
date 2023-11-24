import express from 'express';
import { userController } from './user.controler';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.findUsers);
router.get('/:userId', userController.findSingleUser);

export const userRoute = router;
