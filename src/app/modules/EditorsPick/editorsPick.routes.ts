

import express from 'express';
import { EditorsPickController } from './editorsPick.controller';

const router = express.Router();

router.post('/', EditorsPickController.createEditorPick)


export const EditorsPickRoutes = router;
