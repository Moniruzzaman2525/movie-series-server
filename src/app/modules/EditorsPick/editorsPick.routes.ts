

import express from 'express';
import { EditorsPickController } from './editorsPick.controller';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import alowAuth from '../../middlewares/alowAuth';

const router = express.Router();

router.get('/', alowAuth(UserRole.USER, UserRole.ADMIN), EditorsPickController.getAllEditorPicks)
router.post('/', auth(UserRole.ADMIN), EditorsPickController.createEditorPick)
router.delete('/:id', auth(UserRole.ADMIN), EditorsPickController.removeEditorByPicks)


export const EditorsPickRoutes = router;
