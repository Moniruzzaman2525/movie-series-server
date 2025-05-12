import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidationSchema } from './user.validation';

const router = express.Router();

router.post('/', validateRequest(UserValidationSchema.create), UserController.createUser);

export const UserRoutes = router;
