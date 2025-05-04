import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../helpers/prisma';
import bcrypt from 'bcrypt';
import { sendEmail } from '../../../utils/sendEmail';
import ApiError from '../../errors/apiError';




const loginUser = async (payload: any) => {
    const userData = await prisma.user.findFirstOrThrow({
        where: {
            email: payload.email,
            isDeleted: false
        },
    });

    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password);

    if (!isCorrectPassword) {
        throw new Error('Invalid password');
    }

    const accessToken = jwtHelpers.generateToken(
        {
            email: userData.email,
            role: userData.role,
            id: userData.id,
        },
        config.jwt.jwt_secret as Secret,
        config.jwt.expires_in as string,
    );

    const refreshToken = jwtHelpers.generateToken(
        {
            email: userData.email,
            role: userData.role,
            id: userData.id,
        },
        config.jwt.refresh_token_secret as Secret,
        config.jwt.refresh_token_expires_in as string,
    );

    return {
        accessToken,
        refreshToken,
    };
};

const forgetPassword = async (payload: { email: string }) => {
    const userData = await prisma.user.findFirstOrThrow({
        where: {
            email: payload.email,
        },
    });

    const resetPassToken = jwtHelpers.generateToken(
        { email: userData.email, role: userData.role },
        config.jwt.reset_password_secret as Secret,
        config.jwt.refresh_token_expires_in as string,
    );
    const resetPasswordLink =
        config.jwt.reset_password_link + `?id=${userData.id}&token=${resetPassToken}`;
    const replacements = {
        userName: userData.name,
        resetLink: resetPasswordLink,
    };
    const res = await sendEmail(
        userData.email,
        'Reset your password within ten minutes!',
        'resetPasswordEmail',
        replacements,
    );
    return res;
};

const resetPassword = async (token: string, payload: { id: string; password: string }) => {
    await prisma.user.findFirstOrThrow({
        where: {
            id: payload.id,
            isDeleted: false,
        },
    });

    const isValidToken = jwtHelpers.verifyToken(token, config.jwt.reset_password_secret as Secret);
    if (!isValidToken) {
        throw new ApiError(403, 'You are not authorization')
    }

    const hashPassword: string = await bcrypt.hash(payload.password, 12);
    await prisma.user.update({
        where: {
            id: payload.id,
        },
        data: {
            password: hashPassword,
        },
    });
    return {
        message: 'Password reset successfully',
    };
};

export const AuthServices = {
    loginUser,
    forgetPassword,
    resetPassword,
};
