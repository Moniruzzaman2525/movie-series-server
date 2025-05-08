import express from 'express';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { CommentController } from './comments.controller';

const router = express.Router();

router.get('/', auth(UserRole.USER, UserRole.ADMIN), CommentController.getAllComment);
router.post('/', auth(UserRole.USER, UserRole.ADMIN), CommentController.addComments);
router.get("/:reviewId",CommentController.getCommentByReviewId)
router.patch('/edit-comment/:id', auth(UserRole.USER, UserRole.ADMIN), CommentController.editComment);
router.delete('/delete-comment/:id', auth(UserRole.USER, UserRole.ADMIN), CommentController.deleteComment);
router.get('/:id', auth(UserRole.USER, UserRole.ADMIN), CommentController.getSingleComment);
router.get('/comment-by-user/:id', CommentController.getCommentByUser)
router.get('/comment-by-content/:id', auth(UserRole.USER, UserRole.ADMIN), CommentController.getCommentByContent)


export const CommentsRoutes = router;
