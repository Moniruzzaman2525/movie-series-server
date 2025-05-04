import express from 'express';
import { paymentController } from './payment.controller';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';


const router = express.Router();



router.get('/', auth(UserRole.ADMIN, UserRole.USER), paymentController.getAllPayment)

router.get('/:email', auth(UserRole.ADMIN, UserRole.USER), paymentController.getAllPaymentByUser)

router.post('/', auth(UserRole.ADMIN, UserRole.USER), paymentController.payment)

router.patch('/success/:tran_id', auth(UserRole.ADMIN, UserRole.USER), paymentController.successController)


router.delete('/failed/:tran_id', auth(UserRole.ADMIN, UserRole.USER), paymentController.failedController)

export const paymentRouter = router
