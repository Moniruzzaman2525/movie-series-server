

import express from 'express';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { TagController } from './tag.controller';


const router = express.Router()

router.get('/', auth(UserRole.ADMIN, UserRole.USER), TagController.getAllTags)
router.post('/', auth(UserRole.ADMIN), TagController.createTag)
router.post('/assign-tags', auth(UserRole.ADMIN, UserRole.USER), TagController.assignTagsToReview)


export const TagRoutes = router
