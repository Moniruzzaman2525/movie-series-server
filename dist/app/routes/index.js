"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/User/user.routes");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const content_routes_1 = require("../modules/Content/content.routes");
const comments_rotes_1 = require("../modules/Comments/comments.rotes");
const likes_routes_1 = require("../modules/Likes/likes.routes");
const purchases_routes_1 = require("../modules/Purchases/purchases.routes");
const reviews_routes_1 = require("../modules/Reviews/reviews.routes");
const watchList_routes_1 = require("../modules/WatchList/watchList.routes");
const admin_routes_1 = require("../modules/Admin/admin.routes");
const payment_routes_1 = require("../modules/Payment/payment.routes");
const tag_routes_1 = require("../modules/Tag/tag.routes");
const router = express_1.default.Router();
const modulesRoute = [
    {
        path: '/user',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.AuthRouters,
    },
    {
        path: '/content',
        route: content_routes_1.ContentRouter,
    },
    {
        path: '/comments',
        route: comments_rotes_1.CommentsRoutes,
    },
    {
        path: '/likes',
        route: likes_routes_1.LikesRoutes,
    },
    {
        path: '/purchases',
        route: purchases_routes_1.PurchasesRoutes,
    },
    {
        path: '/reviews',
        route: reviews_routes_1.ReviewRoutes,
    },
    {
        path: '/watch-list',
        route: watchList_routes_1.WatchListRoutes,
    },
    {
        path: '/admin',
        route: admin_routes_1.AdminRoute,
    },
    {
        path: '/payment',
        route: payment_routes_1.paymentRouter
    },
    {
        path: '/tags',
        route: tag_routes_1.TagRoutes
    },
];
modulesRoute.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
