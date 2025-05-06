import express from 'express';
import { LikeController } from './likes.controller';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();


router.post('/video/like', auth(UserRole.USER, UserRole.ADMIN), LikeController.likeVideo);
router.post('/review/like', auth(UserRole.USER, UserRole.ADMIN), LikeController.likeReview);
router.post('/comment/like', auth(UserRole.USER, UserRole.ADMIN), LikeController.likeComment);


export const LikesRoutes = router;
