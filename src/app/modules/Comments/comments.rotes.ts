import express from 'express';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { CommentController } from './comments.controller';

const router = express.Router();

router.get('/', auth(UserRole.USER, UserRole.ADMIN), CommentController.getAllComment);
router.post('/', auth(UserRole.USER), CommentController.addComments);
router.patch('/edit-comment/:id', auth(UserRole.USER), CommentController.editComment);
router.delete('/delete-comment/:id', auth(UserRole.USER), CommentController.deleteComment);
router.get('/:id', auth(UserRole.USER), CommentController.getSingleComment);
router.get('/comment-by-user/:id',CommentController.getCommentByUser)

export const CommentsRoutes = router;
