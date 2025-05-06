import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import catchAsync from "../../shared/catchAsync";
import ApiError from "../errors/apiError";
import config from "../../config";
import httpStatus from 'http-status';
import { jwtHelpers } from "../../helpers/jwtHelpers";
const alowAuth = (...roles: string[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) {
            next()
            return
        }
        const verifiedUser = jwtHelpers.verifyToken(
            token,
            config.jwt.jwt_secret as Secret,
        ) as JwtPayload;
        req.user = verifiedUser;

        if (roles.length && !roles.includes(verifiedUser.role)) {
            throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized');
        }

        next();
    });
};


export default alowAuth
