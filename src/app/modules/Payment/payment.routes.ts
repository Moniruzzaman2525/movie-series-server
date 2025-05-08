import express from 'express';
import { paymentController } from './payment.controller';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';


const router = express.Router();


router.get('/', auth(UserRole.ADMIN, UserRole.USER), paymentController.getAllPayment)

<<<<<<< HEAD
router.get('/:id', auth(UserRole.ADMIN, UserRole.USER), paymentController.getAllPaymentByUser)
=======

router.get('/sell-info', auth(UserRole.ADMIN), paymentController.sellInfo)

router.get('/:email', auth(UserRole.ADMIN, UserRole.USER), paymentController.getAllPaymentByUser)
>>>>>>> 670350526a40f305525090a38c8716b6aab6dd0e

router.post('/', auth(UserRole.ADMIN, UserRole.USER), paymentController.payment)

router.post('/success/:tId', paymentController.successController)

router.delete('/payment/failed/:tId', paymentController.failedController)

export const paymentRouter = router
