import express from 'express';
import { userController } from './user.controler';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.findUsers);
router.get('/:userId', userController.findSingleUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.put('/:userId/orders', userController.addProductForSingleUser);
router.get('/:userId/orders', userController.getAllOrdersForUser);
router.get(
  '/:userId/orders/total-price',
  userController.getTotalOrdersPriceForUser,
);

export const userRoute = router;
