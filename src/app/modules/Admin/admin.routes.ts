

import express from 'express'
import { AdminController } from './admin.controller'
import { auth } from '../../middlewares/auth'
import { UserRole } from '@prisma/client'

const router = express.Router()

router.get('/get-most-review-title',  AdminController.getMostReviewedTitle)
router.get('/get-all-user', auth(UserRole.ADMIN), AdminController.getAllUser)
router.get('/get-user-review', auth(UserRole.ADMIN), AdminController.getAllUserReview)
router.get('/get-user-comments', auth(UserRole.ADMIN), AdminController.getAllUserComments)
router.post('/comment/:id', auth(UserRole.ADMIN), AdminController.approveOrUnpublishComment)
router.patch('/remove-user/:id', auth(UserRole.ADMIN), AdminController.removeUser)
router.patch('/active-user/:id', auth(UserRole.ADMIN), AdminController.activeUser)
router.get('/get-aggregated-ratting/:id', auth(UserRole.ADMIN), AdminController.getAverageRating)
router.patch('/review/:id', auth(UserRole.ADMIN), AdminController.approveOrUnpublishReview)
router.delete('/remove-inappropriate-review/:id', auth(UserRole.ADMIN), AdminController.removeInappropriateReview)
router.delete('/remove-inappropriate-comment/:id', auth(UserRole.ADMIN), AdminController.removeInappropriateComment)

export const AdminRoute = router


