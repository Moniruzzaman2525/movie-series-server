import express from 'express';
import { contentController } from './content.controller';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import alowAuth from '../../middlewares/alowAuth';
import { multerUpload } from '../../../utils';
const router = express.Router();

router.get('/category', contentController.contentByCategory);

router.get('/', alowAuth(UserRole.USER, UserRole.ADMIN), contentController.getAllContent);
router.get('/get-top-rated', alowAuth(UserRole.USER, UserRole.ADMIN), contentController.getTopRatedThisWeek);
router.get('/get-newly-added', alowAuth(UserRole.USER, UserRole.ADMIN), contentController.getNewlyAdded);

router.get('/:id', contentController.getSingleContent);



router.post(
  '/',
  multerUpload.fields([{ name: 'thumbnailImage' }]),
  auth(UserRole.ADMIN),
  (req, res, next) => {
    if (typeof req.body.data === 'string') {
      req.body = JSON.parse(req.body.data);
    }
    return contentController.createContent(req, res, next);
  }
);


router.patch(
  '/:id',
  auth(UserRole.ADMIN),
  multerUpload.fields([{ name: 'thumbnailImage' }]),
  (req, res, next) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    return contentController.updateContent(req, res, next);
  },
);

router.delete('/:id', auth(UserRole.ADMIN), contentController.deleteContent);

export const ContentRouter = router;
