import express from 'express';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { ReviewController } from './reviews.controller';

const router = express.Router();

router.get('/', auth(UserRole.USER, UserRole.ADMIN), ReviewController.getReview);
router.post('/', auth(UserRole.USER), ReviewController.addReview);
router.patch('/edit-review/:id', auth(UserRole.USER), ReviewController.editReview);
router.delete('/delete-review/:id', auth(UserRole.USER), ReviewController.deleteReview);
router.get('/:id', auth(UserRole.USER), ReviewController.getSingleReview);

export const ReviewRoutes = router;
