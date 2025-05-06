import express from 'express';
import { contentController } from './content.controller';
import { upload } from '../../../utils';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import alowAuth from '../../middlewares/alowAuth';
const router = express.Router();

router.get('/category', contentController.contentByCategory);

router.get('/', alowAuth(UserRole.USER, UserRole.ADMIN), contentController.getAllContent);

router.get('/:id', contentController.getSingleContent);



router.post('/', upload.single('file'), auth(UserRole.ADMIN), (req, res, next) => {
  req.body = JSON.parse(req.body.data);
  return contentController.createContent(req, res, next);
});

router.patch(
  '/:id',
  auth(UserRole.ADMIN),
  upload.single('file'),
  (req, res, next) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    return contentController.updateContent(req, res, next);
  },
);

router.delete('/:id', auth(UserRole.ADMIN), contentController.deleteContent);

export const ContentRouter = router;
