import express from 'express';
import { UserRoutes } from '../modules/User/user.routes';
import { AuthRouters } from '../modules/Auth/auth.routes';
import { ContentRouter } from '../modules/Content/content.routes';
import { CommentsRoutes } from '../modules/Comments/comments.rotes';
import { LikesRoutes } from '../modules/Likes/likes.routes';
import { PurchasesRoutes } from '../modules/Purchases/purchases.routes';
import { ReviewRoutes } from '../modules/Reviews/reviews.routes';
import { WatchListRoutes } from '../modules/WatchList/watchList.routes';
import { AdminRoute } from '../modules/Admin/admin.routes';

const router = express.Router();

const modulesRoute = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRouters,
  },
  {
    path: '/content',
    route: ContentRouter,
  },
  {
    path: '/comments',
    route: CommentsRoutes,
  },
  {
    path: '/likes',
    route: LikesRoutes,
  },
  {
    path: '/purchases',
    route: PurchasesRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/watch-list',
    route: WatchListRoutes,
  },
  {
    path: '/admin',
    route: AdminRoute,
  },
];

modulesRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
