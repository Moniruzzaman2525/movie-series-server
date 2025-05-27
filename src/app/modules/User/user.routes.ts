import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidationSchema } from './user.validation';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.get('/me', auth(UserRole.USER, UserRole.ADMIN), UserController.getMe);
router.post('/', validateRequest(UserValidationSchema.create), UserController.createUser);
router.patch('/update-profile', auth(UserRole.USER, UserRole.ADMIN), UserController.updateProfile);

export const UserRoutes = router;
