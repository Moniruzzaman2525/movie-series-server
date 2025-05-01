

import express from 'express'
import { AdminController } from './admin.controller'
import { auth } from '../../middlewares/auth'
import { UserRole } from '@prisma/client'

const router = express.Router()

router.get('/get-most-review-title', auth(UserRole.ADMIN), AdminController.getMostReviewedTitle)
router.get('/get-aggregated-ratting/:id', auth(UserRole.ADMIN), AdminController.getAverageRating)
router.patch('/review/:id', auth(UserRole.ADMIN), AdminController.approveOrUnpublishReview)
router.patch('/comment/:id', auth(UserRole.ADMIN), AdminController.approveOrUnpublishComment)
router.delete('/remove-inappropriate-review/:id', auth(UserRole.ADMIN), AdminController.removeInappropriateReview)
router.delete('/remove-inappropriate-comment/:id', auth(UserRole.ADMIN), AdminController.removeInappropriateComment)

export const AdminRoute = router


