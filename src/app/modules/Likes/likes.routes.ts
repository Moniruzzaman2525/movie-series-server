import express from 'express';
import { LikeController } from './likes.controller';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();


router.post('/like', auth(UserRole.USER, UserRole.ADMIN), LikeController.likeVideo);
router.post('/un-like', auth(UserRole.USER, UserRole.ADMIN), LikeController.unlikeVideo);


export const LikesRoutes = router;
