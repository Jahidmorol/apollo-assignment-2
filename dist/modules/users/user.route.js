"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controler_1 = require("./user.controler");
const router = express_1.default.Router();
router.post('/', user_controler_1.userController.createUser);
router.get('/', user_controler_1.userController.findUsers);
router.get('/:userId', user_controler_1.userController.findSingleUser);
router.put('/:userId', user_controler_1.userController.updateUser);
router.delete('/:userId', user_controler_1.userController.deleteUser);
router.put('/:userId/orders', user_controler_1.userController.addProductForSingleUser);
router.get('/:userId/orders', user_controler_1.userController.getAllOrdersForUser);
router.get('/:userId/orders/total-price', user_controler_1.userController.getTotalOrdersPriceForUser);
exports.userRoute = router;
